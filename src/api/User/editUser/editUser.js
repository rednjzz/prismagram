import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {email, phoneNumber, avatar, firstName, lastName, bio} = args;
      return prisma.updateUser({
        where: {id: user.id},
        data:{
          email,
          phoneNumber,
          avatar,
          firstName,
          lastName,
          bio
        }
      })
    }
  }
}