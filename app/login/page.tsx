"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111]">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5722]">
            <span className="text-2xl font-black text-white">3P</span>
          </div>
          <h1 className="text-2xl font-black text-white">3P Digital Growth</h1>
          <p className="mt-1 text-sm text-[#606060]">Client Performance Dashboard</p>
        </div>
        <div className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-8">
          <h2 className="mb-1 text-lg font-bold text-white">Sign in</h2>
          <p className="mb-6 text-sm text-[#606060]">Use your Google account to access your dashboard</p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#2A2A2A] bg-[#222] py-3 text-sm font-medium text-white transition-all hover:border-[#FF5722]/40 hover:bg-[#2A2A2A]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z"/>
            </svg>
            Continue with Google
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-[#606060]">© 2024 3P Digital Growth. All rights reserved.</p>
      </div>
    </div>
  );
}
