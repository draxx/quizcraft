import type { CreateQuestionDto, QuestionFormFields } from "@/types/question";
import { QuestionDto } from "@/types/question";
import type { UpdateQuestionDto } from "@/types/question";
import { getToken } from "./auth";

export async function fetchQuestions() {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Impossible de charger les questions !");
  return res.json();
}

export async function fetchQuestionById(id: string) {
  const token = getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 404) {
    return null;
  }
  if (!res.ok) throw new Error("Impossible de charger la question !");
  return res.json();
}

export async function createQuestion(data: CreateQuestionDto) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Erreur lors de la création: ${res.statusText}`);
  }
  return res.json();
}

export async function updateQuestion(
  id: string,
  data: UpdateQuestionDto
): Promise<QuestionDto> {
  const token = getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error(`Erreur lors de la mise à jour: ${res.statusText}`);
  }
  return res.json();
}

export async function deleteQuestion(id: string) {
  const token = getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Impossible de supprimer la question !");

  if (res.status === 204) return true;

  return res.json();
}
