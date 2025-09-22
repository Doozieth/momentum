import "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    wallet?: {
      address: `0x${string}`;
      nonce?: string;
      userId?: string;
    };
  }
}

export {};
