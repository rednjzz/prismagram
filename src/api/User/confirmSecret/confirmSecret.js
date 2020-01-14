import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({email});
      console.log(user.loginSecret);
      if(user.loginSecret === secret ){
        return generateToken(user.id);
      }
      throw Error("Wrong Email combination")
    }
  }
}