import { isAuthenticated } from '../../../middlewares'
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId, text } = args;
      const { user } = request;
      
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
        console.log(comment);
        return comment
      } catch (e) {
        throw "fail to comment the post"
      }
      

    }
  }
}