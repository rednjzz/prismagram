import { createWriteStream } from 'fs'
import * as mkdirp from 'mkdirp'
import * as shortid from 'shortid'
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { prisma } from '../generated/prisma-client';

const uploadDir = './uploads'

export const db = new lowdb(new FileSync('db.json'))

// Seed an empty DB
db.defaults({ uploads: [] }).write()

// Ensure upload directory exists
mkdirp.sync(uploadDir);



const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate()
  const path = `${uploadDir}/${id}-${filename}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject),
  )
}

const recordFile = file =>
  db
    .get('uploads')
    .push(file)
    .last()
    .write()



export const processUpload = async upload => {
  
  const { stream, filename, mimetype, encoding } = await upload
  // console.log( stream );
  // const Readstream = stream.read();
  // console.log(typeof(Readstream));
  const { id, path } = await storeUpload({ stream, filename })
  return recordFile({ id, filename, mimetype, encoding, path })
}

export const uploadFile = async (upload, fileUrl) => {
  const { stream, filename, mimetype, encoding } = await upload;
  await storeUpload({ stream, path});
}

export const generateUrl = (filename) => {
  const id = shortid.generate();
  const path = `${uploadDir}/${id}-{filename}`;
  return path;
}
const recode2DB = async (fileUrl, postId) => {
  try {
    return await prisma.createFile({url:fileUrl, Post:{ connect: {id: postId}}});  
  }
  catch (e){
    throw Error("DB Write Error,can't create File Data")
  } 
}
export const processUpload2 = async (upload, post) => {
  try {
    const { stream, filename } = await upload // 파일에서 자료 추출
    const url = await generateUrl(filename);
    await stream.pipe(createWriteStream(url));
    return await recode2DB(url, post.id);
  }
  catch (e) {
    throw Error(e);
  }
}