export interface Question {
  id: string;
  title: string;
  text: string;
  date: number;
  categories: string[];
  user: string;
  comments?: Comment[];
}
