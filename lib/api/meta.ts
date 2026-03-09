import axios from "axios";
import { prisma } from "@/lib/db/prisma";

const BASE = "https://graph.facebook.com/v20.0";

async function getMetaToken(clientId: string) {
  const integration = await prisma.integration.findUnique({
    where: { clientId_type: { clientId, type: "META_ADS" } },
  });
  if (!integration?.accessToken) throw new Error("Meta not connected");
  return { token: integration.accessToken, accountId: integration.accountId! };
}

export async function getMetaMetrics(
  clientId: string,
  startDate: string,
  endDate: string
) {
  const { token, accountId } = await getMetaToken(clientId);

  const params = {
    access_token: token,
    time_range: JSON.stringify({ since: startDate, until: endDate }),
    fields: "spend,impressions,clicks,ctr,cpm,cpp,actions,action_values,roas",
    level: "account",
  };

  const [overview, campaigns] = await Promise.all([
    axios.get(`${BASE}/act_${accountId}/insights`, { params }),
    axios.get(`${BASE}/act_${accountId}/insights`, {
      params: { ...params, level: "campaign", fields: "campaign_name,spend,impressions,clicks,ctr,actions" },
    }),
  ]);

  return {
    overview: overview.data.data?.[0] ?? {},
    campaigns: campaigns.data.data ?? [],
  };
}
