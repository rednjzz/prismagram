import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import "./env";
import schema from "./schema";
import { authenticateJwt } from  "./passport";
import { isAuthenticated, isAuthenticatedUpload} from './middlewares'
import { uploadMiddleware, uploadController} from "./upload";


const PORT = process.env.SERVERPORT || 4000;
const options = {
  port: PORT,
}

const server = new GraphQLServer({ 
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(cors());
server.express.use(logger("dev"));
server.express.use(helmet());
server.express.use(authenticateJwt);
server.express.use(express.static(path.join(__dirname,'../','uploads')))
server.express.post('/api/upload', isAuthenticatedUpload, uploadMiddleware, uploadController);
server.start( options, () => console.log(`Server Running at ${PORT}`));

