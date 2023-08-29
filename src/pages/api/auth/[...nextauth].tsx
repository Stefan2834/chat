import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// Define the type for the provider's configuration
type ProviderConfig = {
  clientId: string;
  clientSecret: string;
};

// Define the complete auth options type
type AuthOptions = NextAuthOptions & {
  providers: Array<ProviderConfig | any>; // Add other provider types here
  secret: string;
};


const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    } as ProviderConfig), 
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID, // Replace with your Google Client ID
    //   clientSecret: process.env.GOOGLE_SECRET, // Replace with your Google Client Secret
    // } as ProviderConfig),
  ],
  secret: process.env.SECRET_KEY as string,
};

export default NextAuth(authOptions);