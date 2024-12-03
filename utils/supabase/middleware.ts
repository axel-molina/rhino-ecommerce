import { NextResponse } from "next/server";
import { supabase } from "./client";

export async function middleware(req) {
  const res = NextResponse.next();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}
