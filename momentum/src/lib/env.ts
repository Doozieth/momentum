export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ironSessionPassword: process.env.IRON_SESSION_PASSWORD ?? "",
  ironSessionCookieName: process.env.IRON_SESSION_COOKIE_NAME ?? "momentum_session",
  ironSessionCookieSecure: (process.env.IRON_SESSION_COOKIE_SECURE ?? "false") === "true",
};

export function assertEnv() {
  const missing: string[] = [];
  if (!env.supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!env.supabaseAnonKey) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!env.ironSessionPassword) missing.push("IRON_SESSION_PASSWORD");
  if (missing.length) {
    // Soft warn in dev rather than throw
    // eslint-disable-next-line no-console
    console.warn(`[env] Missing required env vars: ${missing.join(", ")}`);
  }
}
