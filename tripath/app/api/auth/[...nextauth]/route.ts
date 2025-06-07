import NextAuth from 'next-auth';
// Uncomment and use AuthOptions for more detailed configuration
// import type { AuthOptions } from 'next-auth';

// Import providers as needed, e.g.:
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';

// Define your NextAuth configuration
// TODO: Replace this with your actual authentication providers and options.
// See NextAuth.js documentation for more details: https://next-auth.js.org/configuration/options
// export const authOptions: AuthOptions = {
//   providers: [
//     // Example: GitHub Provider (requires GITHUB_ID and GITHUB_SECRET env vars)
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID!,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     // }),
//     // Example: Credentials Provider
//     // CredentialsProvider({
//     //   name: 'Credentials',
//     //   credentials: {
//     //     email: { label: "Email", type: "email" },
//     //     password: { label: "Password", type: "password" }
//     //   },
//     //   async authorize(credentials) {
//     //     // IMPORTANT: Add your custom logic here to look up the user.
//     //     // Do not use this placeholder logic in production.
//     //     if (credentials?.email === "user@example.com" && credentials?.password === "password") {
//     //       return { id: "1", name: "Test User", email: "user@example.com" };
//     //     }
//     //     // Return null if user data could not be retrieved
//     //     return null;
//     //   }
//     // })
//   ],
//   // adapter: PrismaAdapter(prisma), // Example: Using PrismaAdapter if you have a database
//   // session: {
//   //   strategy: 'jwt', // Or 'database'
//   // },
//   secret: process.env.NEXTAUTH_SECRET, // Essential: Set this in your .env.local and Vercel env vars
//   pages: {
//      signIn: '/auth/signin', // Optional: Path to your custom sign-in page
//      // error: '/auth/error', // Optional: Path to your custom error page
//   },
//   // callbacks: { // Optional: Add callbacks for session, JWT, etc.
//   //   async jwt({ token, user }) {
//   //     if (user) {
//   //       token.id = user.id;
//   //     }
//   //     return token;
//   //   },
//   //   async session({ session, token }) {
//   //     if (session.user) {
//   //       (session.user as any).id = token.id;
//   //     }
//   //     return session;
//   //   },
//   // },
// };

// For a very basic setup, you can start like this and expand authOptions later:
const handler = NextAuth({
  providers: [
    // TODO: Add your authentication providers here.
    // For example, if you had Google configured:
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // It's crucial to have at least one provider configured.
  ],
  secret: process.env.NEXTAUTH_SECRET, // This is ESSENTIAL. Set in Vercel environment variables.
  // debug: process.env.NODE_ENV === 'development', // Optional: For more logs during development
});

export { handler as GET, handler as POST };

// IMPORTANT REMINDERS:
// 1. Configure your desired authentication providers in the `providers` array.
// 2. Set NEXTAUTH_URL and NEXTAUTH_SECRET environment variables in your Vercel project.
//    - NEXTAUTH_URL should be your deployment's full URL (e.g., https://your-app.vercel.app).
//    - NEXTAUTH_SECRET should be a strong, randomly generated string.
// 3. If using database sessions or adapters (like PrismaAdapter), ensure your database is correctly set up and configured.
