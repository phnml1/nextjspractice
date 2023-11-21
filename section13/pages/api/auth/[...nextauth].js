import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth/next";
import { verifyPassword } from "@/lib/auth";
import CredentialsProvider  from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found!');
        }
        console.log(credentials.password,user.password);
        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        client.close();
        return { email: user.email };
      }
    })
  ],
  session: {
    jwt: true
  },
});
