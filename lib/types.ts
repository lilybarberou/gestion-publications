export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  firstname: string;
  domain: string;
}

export type Type = {
  id: number;
  label: string;
}

export type Publication = {
  id: number;
  title: string;
  authors: string;
  date_published: Date;
  link: string;
  review: string;
  conference: string;
  book: string;
  volume: string;
  number: string;
  pages: number;
  editor: string;
  user_id: number;
  type_id: number;
}