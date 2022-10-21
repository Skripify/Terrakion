import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/").pop();

  const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
  if (slugFetch.status === 404) return NextResponse.next();

  const data = await slugFetch.json();
  if (data?.url) return NextResponse.redirect(data.url);
}

export const config = {
  matcher: "/:slug*",
};
