
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  const token = await getToken({ req: request });

  if (token) {
    if (pathname=="/login" || pathname == "/register")
    {
      return NextResponse.redirect(new URL('/', request.url ))
    }
    return NextResponse.next();
  }

  if ( pathname == '/cart' || pathname == '/wishlist'){
    return NextResponse.redirect(new URL("/login", request.url));
  }

   return NextResponse.next();
}

export const config = {
    matcher:["/cart","/wishlist","/login","/register"],
}