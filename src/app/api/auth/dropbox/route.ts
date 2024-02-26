import { NextResponse } from "next/server";


export async function GET(req:Request, res:Response) {
    const clientId = process.env.DROPBOX_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.DROPBOX_REDIRECT_URI as string);
    const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
    return NextResponse.redirect(authUrl);
  }