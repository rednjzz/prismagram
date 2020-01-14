import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, location, caption} = args;
      const { user } = request;
      const post = await prisma.$exists.post({id, user: {id: user.id}});
      if (post) {
        return await prisma.updatePost({where:{id}, data:{caption, location}});
      } else {
        throw Error("Cant do that");
      }

    }
  }
}