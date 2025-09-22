import { IronSessionOptions } from "iron-session";
import { env } from "@/lib/env";

export const sessionOptions: IronSessionOptions = {
  cookieName: env.ironSessionCookieName,
  password: env.ironSessionPassword,
  cookieOptions: {
    secure: env.ironSessionCookieSecure,
    sameSite: "lax",
  },
};
