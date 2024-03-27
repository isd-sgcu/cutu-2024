export interface Game {
  id: string;
  title: string;
  description: string;
  votes: { image: string, name: string }[];
  histories: { name: string, votes: number }[];
  winner?: string;
  createdAt: Date;
  updatedAt: Date;
}
