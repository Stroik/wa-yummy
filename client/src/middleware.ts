import withAuth from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    '/((?!auth/login|home|api|assets/images|request|icon-192x192.png|icon-256x256.png|icon-384x384.png|icon-512x512.png|manifest.json|sw.js|).*)',
  ],
};
