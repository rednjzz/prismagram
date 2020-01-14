import { prisma } from "../../../../generated/prisma-client"
import { isAuthenticated } from "../../../middlewares";

// like가 눌리면 
// 1. 인증 확인 
// 2. 필터 옵션에 맞는 like가 존재하면 삭제 없으면 생성

export default {
  Mutation: {
    toggleLike: async (_, args, {request}) => {
      isAuthenticated(request);
      const { postId }  = args;
      const { user }  = request;

      const filterOpt = {
        AND: [
          {
            post: {
              id: postId,
            }
          },
          {
            user: {
              id: user.id
            } 
          }
        ]
      }
    
      try {
        const existingLike = await prisma.$exists.like(filterOpt);
        if (existingLike) {
          await prisma.deleteManyLikes(filterOpt); //filterOptions의 결과 값은 Uniqe하지 않다
          return true;
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          })
          return true;
        }
      } catch (e) {
        return false;
      }
      
    }
  }
}