import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPosts: (_, args) => {
      const { term } = args;
      return prisma.posts({ where: {
        OR: [
          {
            location_starts_with: term
          },
          {
            caption_starts_with: term
          }
        ]
      }})
    }
  }
}