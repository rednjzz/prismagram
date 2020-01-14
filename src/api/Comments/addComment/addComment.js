import { isAuthenticated } from '../../../middlewares'
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      const { postId, text } = args;
      const { user } = request;

      isAuthenticated(request);
      try {
        const comment = await prisma.createComment({
          text: text,
          user: {
            connect: { id: user.id }
          },
          post: {
            connect: { id: postId }
          }
        })
        return comment
      } catch (e) {
        throw "fail to comment the post"
      }
      

    }
  }
}