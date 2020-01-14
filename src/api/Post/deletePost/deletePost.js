import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deletePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const post = await prisma.$exists.post({id, user: {id: user.id}});
      if (post) {
        return await prisma.deletePost({id});
      }
      
    }
  }
}