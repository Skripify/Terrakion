import NextAuth, { NextAuthOptions } from "next-auth";
import { prisma } from "@/backend/utils/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
// import TwitterProvider from "next-auth/providers/twitter";
import TwitchProvider from "next-auth/providers/twitch";
import DiscordProvideer from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_ID,
      clientSecret: process.env.TWITCH_SECRET,
    }),
    DiscordProvideer({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    //   version: "2.0",
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  theme: {
    brandColor: "#ea580c",
    colorScheme: "dark",
    logo: "/logo.png",
  },
  secret:
    "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id;

      return session;
    },
  },
};

export default NextAuth(authOptions);
