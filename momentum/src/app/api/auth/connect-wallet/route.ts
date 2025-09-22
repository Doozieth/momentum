import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { verifyMessage, type Address } from "viem";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

const StartSchema = z.object({ action: z.literal("start"), address: z.string().regex(/^0x[0-9a-fA-F]{40}$/) });
const VerifySchema = z.object({ action: z.literal("verify"), address: z.string().regex(/^0x[0-9a-fA-F]{40}$/), signature: z.string() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const cookieStore = cookies();
  const session = await getIronSession<{ wallet?: { address: `0x${string}`; nonce?: string; userId?: string } }>(
    { cookies: cookieStore as any } as any,
    sessionOptions
  );

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (StartSchema.safeParse(body).success) {
    const { address } = body as z.infer<typeof StartSchema>;
    const nonce = randomBytes(16).toString("hex");
    session.wallet = { address: address as Address, nonce };
    await session.save();
    const message = `Momentum wants to connect your wallet.\n\nNonce: ${nonce}`;
    return NextResponse.json({ message });
  }

  if (VerifySchema.safeParse(body).success) {
    const { address, signature } = body as z.infer<typeof VerifySchema>;
    if (!session.wallet?.nonce || session.wallet.address.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: "No auth session" }, { status: 400 });
    }
    const message = `Momentum wants to connect your wallet.\n\nNonce: ${session.wallet.nonce}`;
    const valid = await verifyMessage({ address: address as Address, message, signature });
    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    // Mark as verified
    session.wallet = { address: address as Address };
    await session.save();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
