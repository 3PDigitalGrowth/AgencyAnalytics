import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { prisma } from "@/lib/db/prisma";

async function getGA4Client(clientId: string) {
  const integration = await prisma.integration.findUnique({
    where: { clientId_type: { clientId, type: "GOOGLE_ANALYTICS" } },
  });
  if (!integration?.accessToken) throw new Error("GA4 not connected");

  const client = new BetaAnalyticsDataClient({
    authClient: {
      getAccessToken: async () => ({ token: integration.accessToken }),
    } as never,
  });
  return { client, propertyId: integration.propertyId! };
}

export async function getGA4Metrics(
  clientId: string,
  startDate: string,
  endDate: string
) {
  const { client, propertyId } = await getGA4Client(clientId);

  const [overview, channels, topPages] = await Promise.all([
    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
        { name: "conversions" },
      ],
    }),
    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "sessionDefaultChannelGrouping" }],
      metrics: [{ name: "sessions" }, { name: "conversions" }],
    }),
    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "averageSessionDuration" }],
      limit: 10,
    }),
  ]);

  return { overview, channels, topPages };
}
