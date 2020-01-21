import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    createAccount: async(_, args) => {
      const { username, email, firstName ="", lastName = "", bio = "" } = args;
      const exist = await prisma.$exists.user({email});
      if (!exist) {
        const user = await prisma.createUser({username, email, firstName, lastName, bio})
        return user;
      } else {
        throw Error("this user is exist");
      }
      
    }
  }
}