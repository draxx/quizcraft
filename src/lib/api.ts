import type { QuestionFormFields } from "@/types/question";

export async function fetchQuestions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
    },
  });

  if (!res.ok) throw new Error("Impossible de charger les questions !");
  return res.json();
}

export async function fetchQuestionById(id:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
    },
  });

  if (!res.ok) throw new Error("Impossible de charger la question !");
  return res.json();
}

export async function updateQuestion(id: string, data: QuestionFormFields) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Erreur lors de la mise à jour: ${res.statusText}`);
  }
  return res.json();
}
