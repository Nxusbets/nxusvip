import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbPromise from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                try {
                    const db = await dbPromise();
                    const collection = db.collection("users");

                    const user = await collection.findOne({ email: credentials.email });

                    if (!user) {
                        console.log("Usuario no encontrado:", credentials.email);
                        throw new Error("Usuario no encontrado");
                    }

                    console.log("Usuario encontrado:", user);

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    console.log("Contraseña válida:", isPasswordValid);

                    if (!isPasswordValid) {
                        console.log("Contraseña incorrecta:", credentials.email);
                        throw new Error("Contraseña incorrecta");
                    }

                    return { email: user.email, name: user.name, role: user.role };
                } catch (error) {
                    console.error("Error en la autenticación:", error);
                    throw error;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };