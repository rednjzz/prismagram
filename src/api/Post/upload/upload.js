import { prisma } from "../../../../generated/prisma-client";


export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated}) => {
      isAuthenticated(request);
      const {caption, files } = args;
      const { user } = request;
      const post = await prisma.createPost({caption, user: { connect: {id : user.id}}});
      files.forEach(async file => 
        await prisma.createFile({url:file, Post:{ connect: {id : post.id }}})
      )
      console.log(post);
      return post;
    }
  }
}