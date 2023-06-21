import { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export function middleware(request) {
    const response = NextResponse.next()

    if (request.nextUrl.pathname.startsWith("/api")) {
        response.headers.append("Access-Control-Allow-Origin", "*")
      }
      return response
}