import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, phoneNumber, firstName ="", lastName = "", bio = "" } = args;  
      try{
        const exist = await prisma.$exists.user({OR: [{username}, {email}, {phoneNumber}]});
        if (!exist) {
          const user = await prisma.createUser({username, email, phoneNumber, firstName, lastName, bio})
          return true;
        } else {
          return false;
        }
      } catch (e) {
        throw Error(e);
      }

      
      
    }
  }
}