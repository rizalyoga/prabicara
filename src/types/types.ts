type RoutesType = {
  path: string;
  name: string;
  icon: React.ReactNode;
};

export interface RoutesInterfaces {
  path: string;
  name: string;
  icon: React.ReactNode;
  submenu: RoutesType[];
}

export type QuestionVideoType = {
  second: number;
  point: number;
  question: string;
  choices: string[];
  trueAnswer: string;
};

export interface QuestionVideoInterface {
  path: string;
  videoUrl: string;
  questions: QuestionVideoType[];
}

export interface StudentDataProps {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  id: number;
  date: string;
}

export interface LoginProps {
  username: string;
  password: string;
}

export interface PrestestProps {
  id: number;
  question: string;
  choices: string[];
  answer: string;
  score: number;
}