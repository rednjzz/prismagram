import { prisma } from "../../../generated/prisma-client";

export default{
  Post: {
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      const { id: postId } = parent;
      return await prisma.$exists.like({
        AND:[ { user:{ id: user.id} },{ post: {id: postId } }]
      })
    },
    likeCount: parent => {
      return prisma.likesConnection({where: {post: {id: parent.id}}})
              .aggregate().count();
    },
    files: parent => prisma.post({id: parent.id }).file(),
    comments: parent => prisma.post({id: parent.id }).comment(),
    user: parent => prisma.post({id: parent.id}).user()
  }
}