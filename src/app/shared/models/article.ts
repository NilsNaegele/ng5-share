import { Profile } from './profile';

export class Article {
  slug: string;
  title = '';
  body = '';
  tagList: string[] = [];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
