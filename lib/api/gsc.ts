import { google } from "googleapis";
import { prisma } from "@/lib/db/prisma";

async function getGSCAuth(clientId: string) {
  const integration = await prisma.integration.findUnique({
    where: { clientId_type: { clientId, type: "GOOGLE_SEARCH_CONSOLE" } },
  });
  if (!integration?.accessToken) throw new Error("GSC not connected");

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  auth.setCredentials({
    access_token: integration.accessToken,
    refresh_token: integration.refreshToken ?? undefined,
    expiry_date: integration.expiresAt?.getTime(),
  });
  return { auth, siteUrl: integration.propertyId! };
}

export async function getGSCMetrics(
  clientId: string,
  startDate: string,
  endDate: string
) {
  const { auth, siteUrl } = await getGSCAuth(clientId);
  const webmasters = google.searchconsole({ version: "v1", auth });

  const [summary, topPages, topQueries] = await Promise.all([
    webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["date"],
        rowLimit: 90,
      },
    }),
    webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 10,
      },
    }),
    webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 10,
      },
    }),
  ]);

  return {
    timeSeries: summary.data.rows ?? [],
    topPages: topPages.data.rows ?? [],
    topQueries: topQueries.data.rows ?? [],
  };
}
