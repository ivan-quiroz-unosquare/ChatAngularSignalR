export interface Message {
  userName: string;
  content: string;
  date: number;
  to?: string;
  groupName?: string;
}
