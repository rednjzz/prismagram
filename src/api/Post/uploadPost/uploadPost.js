import { prisma } from "../../../../generated/prisma-client";
import { processUpload2 } from '../../../utils2';

export default {
  Mutation: {
    singleUpload: async (_, args, { request, isAuthenticated}) => {
      isAuthenticated(request);
      console.log("Hello");
      const {caption} = args;
      const { user } = request;
      const post = await prisma.createPost({caption, user: { connect: {id : user.id}}});
      const result = await processUpload2(file, post);
      console.log(post);
      
      return post;
    }
  }
}