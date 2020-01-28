import {generateSecret, sendSecretMail} from '../../../utils'
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const exist = await prisma.$exists.user({email});
      if (exist) {
        const loginSecret = generateSecret();
        try {
          await sendSecretMail(email, loginSecret);
          await prisma.updateUser({data:{loginSecret}, where: { email }});
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      } else {
        throw Error("Unregistered Email, Please Sign up")
        return false;
      }
      
    }
  }
};