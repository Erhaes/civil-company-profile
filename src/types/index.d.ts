export interface Navigation {
  title: string;
  path: string;
}

export interface faq {
  answer: string;
  question: string;
}

export interface download {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  category: string;
  uploadDate: string;
}