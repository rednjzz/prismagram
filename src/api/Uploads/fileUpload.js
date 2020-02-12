import { processUpload } from "../../utils2";

export default {
  Mutation: {
    singleUpload2: (obj, { file }) => processUpload(file),
    multipleUpload: (obj, { files }) => Promise.all(files.map(processUpload)),
  }
}