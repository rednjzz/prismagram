import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    testUser: async (_, args, {request}) => {
      await isAuthenticated(request);
      const {email} = args;
      return await prisma.user({email})
    }
  }
}