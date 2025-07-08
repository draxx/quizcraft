export type IncorrectAnswerField = { value: string };

export type QuestionFormFields = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: IncorrectAnswerField[];
};