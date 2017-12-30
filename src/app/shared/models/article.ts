import { Profile } from './profile';

export class Article {
  slug = '';
  title = '';
  description = '';
  body = '';
  tagList: string[] = [];
  createdAt = '';
  updatedAt = '';
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
