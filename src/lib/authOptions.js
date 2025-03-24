import loginUser from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNameObj } from "./dbConnect";


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
         
          credentials: {
            email: { label: "email", type: "email", placeholder: "Enter Email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            console.log("credentials:", credentials)
           
            const user = await loginUser(credentials);
            console.log(user)
      
            // If no error and we have user data, return it
            if (user) {
              return user
            }
            // Return null if user data could not be retrieved
            return null
          }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),
      ],
      pages:{
        signIn: '/login',
      },
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            //console.log({ user, account, profile, email, credentials })
            if(account){
                const {providerAccountId, provider} = account;
                const {email: user_email, image, name} = user;
                const usersCollection = dbConnect(collectionNameObj.usersCollection);
                const isExist = await usersCollection.findOne({providerAccountId});
                if(!isExist){
                    const payload = {providerAccountId, provider, email: user_email, image, name}
                    await usersCollection.insertOne(payload)
                }
            }
            return true
          },
      }
      
  }