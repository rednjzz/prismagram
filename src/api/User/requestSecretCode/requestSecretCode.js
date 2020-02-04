import {generateSecretCode, sendSecretSMS} from '../../../utils'
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecretCode: async (_, args) => {
      const { phoneNumber } = args;
      const exist = await prisma.$exists.user({phoneNumber});
      if (exist) {
        const loginSecretCode = generateSecretCode();
        try {
          await sendSecretSMS(phoneNumber, loginSecretCode);
          await prisma.updateUser({data:{loginSecretCode}, where: { phoneNumber }});
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      } else {
        throw Error("Unregistered PhoneNumber, Please Sign up")
        return false;
      }
      
    }
  }
};