export interface MessageInterface {
  id?: number;
  userId?: number;
  receiverId?: number;
  message: string;
  publish_date: Date;
}
