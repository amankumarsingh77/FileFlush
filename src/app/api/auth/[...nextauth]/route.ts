import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";



export const authOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
            authorization:{
                params:{
                    scope:"https://www.googleapis.com/auth/drive"
                }
            },
        }),
    ],
    // callbacks: {
    //     async jwt(token, user) {
    //       if (user) {
    //         token.accessToken = user.accessToken;
    //         console.log(user);
    //       }
    //       return token;
    //     },
    //     async session(session, token) {
    //       session.accessToken = token.accessToken;
    //       console.log(token);
    //       return session;
    //     },
    //     async signIn({ user, account, profile, email, credentials }) {
    //         console.log(user, account, profile, email, credentials);
    //         return true
    //       },
    //   },
    secret: process.env.NEXTAUTH_SECRET
}

const handler  = NextAuth(authOptions);
export {handler as GET, handler as POST}