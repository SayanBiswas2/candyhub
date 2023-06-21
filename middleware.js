import { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export function middleware(request) {
    const allowedOrigins = [
        "https://candyhub.varcel.app"
    ];
        
    const requestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    
    const origin = requestHeaders.get('origin');
    if ( origin && allowedOrigins.includes(origin) ) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', "true")
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    }
    
    return response
}