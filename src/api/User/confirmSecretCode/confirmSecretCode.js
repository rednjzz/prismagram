import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecretCode: async (_, args) => {
      const { phoneNumber, secretCode } = args;
      const user = await prisma.user({phoneNumber});
      console.log(user.loginSecretCode);
      if(user.loginSecretCode === secretCode ){
        return generateToken(user.id);
      }
      throw Error("Wrong Phone Number or Secret Code");
    }
  }
}