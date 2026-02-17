import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { jwt } from "zod";

export const authOptions : AuthOptions = {
 providers :[
        CredentialsProvider({
            name:"Omar",
            credentials:{
                email:{placeholder: 'ahmed@gmail.com',type:'email'},
                password:{label:"enter your password",type:'password'}

            },
            async authorize (data) {
                const response = await fetch ('https://ecommerce.routemisr.com/api/v1/auth/signin',{
                    method:'POST',
                    body:JSON.stringify({email : data?.email , password : data?.password}),
                    headers: {
  "Content-Type": "application/json"
}
            });
            const payload = await response.json();

            if(response.ok){
                return{
                    id : payload.user.email,
                    user : payload.user,
                    token : payload.token
                }

            }else{
                throw new Error(payload.message)
            }

           
            }
        })
    ],
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.user = user.user;
      token.token = user.token; // مهم جدًا
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user && token.user) {
      session.user = {
        ...token.user,
        token: token.token,
      };
    }
    return session;
  },
},
    pages:{
        signIn : '/login',
        error : '/login'
    },
    secret : process.env.NEXTAUTH_SECRET,    

}