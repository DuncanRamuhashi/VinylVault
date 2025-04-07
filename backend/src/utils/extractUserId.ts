import { ObjectId } from "mongodb";

interface User {
  _id: string | ObjectId;
}

export function extractUserId(user: User): string {
  const id = user._id.toString();
 
  return id;
}
