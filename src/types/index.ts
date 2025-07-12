
export interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    id: string;
    username: string;
    avatar?: string;
    reputation: number;
  };
  votes: number;
  answers: Answer[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
    reputation: number;
  };
  votes: number;
  isAccepted: boolean;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  votes: number;
  createdAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  questionsCount: number;
  color: string;
}
