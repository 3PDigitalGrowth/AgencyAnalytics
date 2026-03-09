import { GoogleAdsApi } from "google-ads-api";
import { prisma } from "@/lib/db/prisma";

async function getGAdsClient(clientId: string) {
  const integration = await prisma.integration.findUnique({
    where: { clientId_type: { clientId, type: "GOOGLE_ADS" } },
  });
  if (!integration?.accessToken) throw new Error("GAds not connected");

  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });

  const customer = client.Customer({
    customer_id: integration.accountId!,
    refresh_token: integration.refreshToken!,
  });

  return customer;
}

export async function getGAdsMetrics(
  clientId: string,
  startDate: string,
  endDate: string
) {
  const customer = await getGAdsClient(clientId);

  const campaigns = await customer.query(`
    SELECT
      campaign.name,
      campaign.status,
      metrics.cost_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.conversions,
      metrics.conversions_value,
      metrics.roas
    FROM campaign
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
    AND campaign.status = 'ENABLED'
    ORDER BY metrics.cost_micros DESC
    LIMIT 20
  `);

  const totals = await customer.query(`
    SELECT
      metrics.cost_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.conversions,
      metrics.conversions_value
    FROM customer
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
  `);

  return { campaigns, totals: totals[0] };
}
