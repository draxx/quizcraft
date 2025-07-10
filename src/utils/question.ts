import type { IncorrectAnswerField } from "@/types/question";
import { QuestionFormFields } from "@/types/question";
import { QuestionDto } from "@/types/question";
import { CreateQuestionDto } from "@/types/question";
import { UpdateQuestionDto } from "@/types/question";

export function toIncorrectAnswerFields(
  arr?: string[] | IncorrectAnswerField[]
): IncorrectAnswerField[] {
  if (!arr || arr.length === 0) return [{ value: "" }, { value: "" }, { value: "" }];
  if (typeof arr[0] === "string") return (arr as string[]).map(value => ({ value }));
  return arr as IncorrectAnswerField[];
}

export function questionDtoToForm(dto: QuestionDto): QuestionFormFields {
  return {
    question: dto.question,
    correctAnswer: dto.correctAnswer,
    incorrectAnswers: dto.incorrectAnswers.map(incorrectAnswer => ({ value: incorrectAnswer })),
    difficulty: dto.difficulty
  };
}

export function formToCreateQuestionDto(form: QuestionFormFields): CreateQuestionDto {
  return {
    question: form.question,
    correctAnswer: form.correctAnswer,
    incorrectAnswers: form.incorrectAnswers.map(a => a.value),
    difficulty: form.difficulty!,
    category: form.category!,
    language: "fr",
    tags: [],
    namedEntities: [],
    qualityScore: undefined,
  };
}

export function formToUpdateQuestionDto(form: QuestionFormFields): UpdateQuestionDto {
  const updateDto: UpdateQuestionDto = {};
  if (form.question !== undefined) updateDto.question = form.question;
  if (form.correctAnswer !== undefined) updateDto.correctAnswer = form.correctAnswer;
  if (form.incorrectAnswers !== undefined) updateDto.incorrectAnswers = form.incorrectAnswers.map(a => a.value);
  if (form.difficulty !== undefined) updateDto.difficulty = form.difficulty;
  if (form.category !== undefined) updateDto.category = form.category;
  return updateDto;
}