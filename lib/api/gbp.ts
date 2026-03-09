import { google } from "googleapis";
import { prisma } from "@/lib/db/prisma";

async function getGBPAuth(clientId: string) {
  const integration = await prisma.integration.findUnique({
    where: { clientId_type: { clientId, type: "GOOGLE_BUSINESS_PROFILE" } },
  });
  if (!integration?.accessToken) throw new Error("GBP not connected");

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  auth.setCredentials({
    access_token: integration.accessToken,
    refresh_token: integration.refreshToken ?? undefined,
  });
  return { auth, locationId: integration.propertyId! };
}

export async function getGBPMetrics(
  clientId: string,
  startDate: string,
  endDate: string
) {
  const { auth, locationId } = await getGBPAuth(clientId);
  
  // Business Profile Performance API
  const res = await fetch(
    `https://businessprofileperformance.googleapis.com/v1/${locationId}:fetchMultiDailyMetricsTimeSeries?` +
    new URLSearchParams({
      "dailyMetrics": "BUSINESS_IMPRESSIONS_DESKTOP_MAPS",
      "dailyMetrics2": "BUSINESS_IMPRESSIONS_MOBILE_MAPS",
      "dailyMetrics3": "BUSINESS_DIRECTION_REQUESTS",
      "dailyMetrics4": "CALL_CLICKS",
      "dailyMetrics5": "WEBSITE_CLICKS",
      "dailyRange.startDate.year": startDate.split("-")[0],
      "dailyRange.startDate.month": startDate.split("-")[1],
      "dailyRange.startDate.day": startDate.split("-")[2],
      "dailyRange.endDate.year": endDate.split("-")[0],
      "dailyRange.endDate.month": endDate.split("-")[1],
      "dailyRange.endDate.day": endDate.split("-")[2],
    }),
    {
      headers: {
        Authorization: `Bearer ${(await auth.getAccessToken()).token}`,
      },
    }
  );

  const data = await res.json();
  return data;
}
