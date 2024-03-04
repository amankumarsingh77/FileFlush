import NextAuth  from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

declare module 'next-auth' {
    interface Session {
      accessToken?: string;
    }
  }

interface Token extends JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
}


// This is a simplified example. You'll need to adjust it based on your actual setup.
async function refreshAccessToken(token:Token) {
    try {
      const url = `https://oauth2.googleapis.com/token`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID as string,
          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
          refresh_token: token.refreshToken,
          grant_type: 'refresh_token',
        }),
      });
  
      const refreshedTokens = await response.json();
  
      if (!response.ok) {
        throw refreshedTokens;
      }
  
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      };
    } catch (error) {
      console.error('RefreshAccessTokenError', error);
  
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
    }
  }


export const {handlers:{GET, POST}, auth, signIn, signOut} = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
            authorization:{
                params:{
                    access_type:"offline",
                    // grant_type:"authorization_code",
                    prompt:"consent",
                    scope:"openid email profile https://www.googleapis.com/auth/drive"
                }
            },
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token }:{token:any }) {
            const shouldRefresh = Date.now() > token.accessTokenExpires;
            if (shouldRefresh) {
              return await refreshAccessToken(token);
            }
            return token;
          },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string | undefined;
            return session;
        },
    },
})