import { NextResponse } from 'next/server';

// https://nextjs.org/docs/pages/guides/content-security-policy
export async function contentSecurityPolicyMiddleware(request) {
  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  if (
    process.env.NODE_ENV !== 'production' ||
    response.headers.get('Content-Security-Policy')
  ) {
    return;
  }

  console.log('____contentSecurityPolicy____');
  //   const cspHeader = `
  //     default-src 'self';
  //     script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  //     style-src 'self' 'nonce-${nonce}';
  //     img-src 'self' blob: data:;
  //     font-src 'self';
  //     object-src 'none';
  //     base-uri 'self';
  //     form-action 'self';
  //     frame-ancestors 'none';
  //     upgrade-insecure-requests;
  // `;
  // default-src -> 允許資源來源
  const cspHeader = `
    default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.youtube.com https://connect.facebook.net https://www.googletagmanager.com https://js.tappaysdk.com;
    font-src 'self' https://fonts.gstatic.com https://js.tappaysdk.com;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    img-src 'self' data: https://js.tappaysdk.com https://www.google-analytics.com https://stats.g.doubleclick.net;
    object-src 'none';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com https://sandbox.tappaysdk.com https://portal.tappaysdk.com https://js.tappaysdk.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://js.tappaysdk.com;
    connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://sandbox.tappaysdk.com https://portal.tappaysdk.com https://js.tappaysdk.com https://firebase.googleapis.com https://fcmregistrations.googleapis.com https://analytics.google.com https://stats.g.doubleclick.net;
    frame-src 'self' https://www.youtube.com https://www.googletagmanager.com https://sandbox.tappaysdk.com https://portal.tappaysdk.com https://js.tappaysdk.com https://*.tappaysdk.com;
    upgrade-insecure-requests;
`;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  );

  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  );

  return response;
}

export default contentSecurityPolicyMiddleware;
