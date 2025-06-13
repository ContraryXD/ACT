import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the route is an admin route
  if (pathname.startsWith("/admin")) {
    // You can add authentication logic here
    // For now, we'll just continue but this is where you'd check for admin authentication

    // Add security headers for admin routes
    const response = NextResponse.next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return response;
  }
  // For API routes, add CORS headers and handle authentication
  if (pathname.startsWith("/api")) {
    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // Public API routes that don't require authentication
    const publicRoutes = ["/api/contacts", "/api/services", "/api/projects", "/api/news"];
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    // Check for protected API routes (admin routes)
    if (pathname.startsWith("/api/admin") && !isPublicRoute) {
      const authHeader = request.headers.get("authorization");
      const token = request.headers.get("x-api-key");

      if (!authHeader && !token) {
        return new NextResponse(
          JSON.stringify({
            error: "Unauthorized",
            message: "Authentication required for admin endpoints",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          }
        );
      }
    }

    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
