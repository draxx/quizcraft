import type { IncorrectAnswerField } from "@/types/question";

export function toIncorrectAnswerFields(
  arr?: string[] | IncorrectAnswerField[]
): IncorrectAnswerField[] {
  if (!arr || arr.length === 0) return [{ value: "" }, { value: "" }, { value: "" }];
  if (typeof arr[0] === "string") return (arr as string[]).map(value => ({ value }));
  return arr as IncorrectAnswerField[];
}