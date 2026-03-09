"use client";

export default function ClarityPage({ params }: { params: { clientId: string } }) {
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Microsoft Clarity</h2>
        <p className="text-sm text-[#606060]">Heatmaps, session recordings & user behaviour</p>
      </div>

      <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] overflow-hidden">
        {clarityProjectId ? (
          <iframe
            src={`https://clarity.microsoft.com/projects/view/${clarityProjectId}/dashboard`}
            className="w-full"
            style={{ height: "calc(100vh - 200px)", border: "none" }}
            title="Microsoft Clarity"
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-12 w-12 rounded-xl bg-[#742774]/20 flex items-center justify-center mb-4">
              <span className="text-2xl">👁</span>
            </div>
            <p className="text-sm font-semibold text-white mb-1">Clarity Not Connected</p>
            <p className="text-xs text-[#606060] max-w-xs">
              Add your Clarity Project ID to <code className="text-[#FF5722]">NEXT_PUBLIC_CLARITY_PROJECT_ID</code> in your environment variables, then connect the tracking script to the client's site.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
