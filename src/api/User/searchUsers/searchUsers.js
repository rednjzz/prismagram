import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchUsers: (_, args) => {
      const { term } = args;
      return prisma.users({ where: {
        OR: [
          {
            firstName_contains: term
          },
          {
            lastName_contains: term
          }
        ]
      }})
    }
  }
}