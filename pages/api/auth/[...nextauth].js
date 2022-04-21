import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "../../../config/dbConnect";

import User from "../../../models/User";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder:'abc@gmail.com'},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                dbConnect();

                const {email, password} = credentials;

                //Check if email exists
                if(!email || !password) {
                    throw new Error("Please enter email or password")
                }

                const user = await User.findOne({email}).select('+password')

                if(!user) {
                    throw new Error("Invalid Email or password")
                }

                // Check if password is correct or not
                const isPasswordMatched = await user.comparePassword(password);

                if(!isPasswordMatched) throw new Error ("Invalid Email or password")

                return Promise.resolve(user);
            }
        })
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            if(user){
                token.id = user.id
            }
            return token;
        },
        session: ({session, token}) => {
            if(token) {
                session.id = token.id;
            }
            return session;
        }
    },
    secret: "test12",
    jwt: {
        secret: "test12",
        encryption: true
    }
})