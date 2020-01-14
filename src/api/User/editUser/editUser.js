import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {email, avatar, firstName, lastName, bio} = args;
      return prisma.updateUser({
        where: {id: user.id},
        data:{
          email,
          avatar,
          firstName,
          lastName,
          bio
        }
      })
    }
  }
}