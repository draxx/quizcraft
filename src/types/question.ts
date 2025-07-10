export type Difficulty = "easy" | "medium" | "hard";
export type IncorrectAnswerField = { value: string };

export type QuestionFormFields = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: IncorrectAnswerField[];
  difficulty?: Difficulty;
  category?: string;
};

export type CreateQuestionDto = {
  language: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  difficulty: Difficulty;
  category: string;
  tags?: string[];
  namedEntities?: string[];
  qualityScore?: number;
  
};

export type UpdateQuestionDto = Partial<CreateQuestionDto>;

export type QuestionDto = CreateQuestionDto & {
  baseId: string;
  localizedId: string;
  createdAt: string;
  updatedAt: string;
};