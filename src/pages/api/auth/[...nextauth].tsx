import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { NextAuthOptions } from "next-auth";

// Define the type for the provider's configuration
type DiscordProviderConfig = {
  clientId: string;
  clientSecret: string;
};

// Define the complete auth options type
type AuthOptions = NextAuthOptions & {
  providers: Array<DiscordProviderConfig | any>; // Add other provider types here
  secret: string;
};


const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    } as DiscordProviderConfig), // Use the type assertion
    // ...add other providers here
  ],
  secret: process.env.SECRET_KEY as string,
};

export default NextAuth(authOptions);