import { db } from "../../utils2";

export default {
  Query: {
    uploads: () => db.get('uploads').value(),
  }
}
