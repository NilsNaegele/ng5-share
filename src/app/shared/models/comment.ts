import { Profile } from './profile';

export class Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
