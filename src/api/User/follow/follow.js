import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    follow: async (_, args, { request }) => {
      const { followingId } = args;
      const { user } = request;
      isAuthenticated(request);

      try {
        await prisma.updateUser({
          where : { id: user.id },
          data  : {
            followings: {
              connect: {
                id: followingId
              }
            }
          } 
        })
        return true;
      } catch(e) {
        return false;
      }
    }
  }
}