"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchQuestionById } from "@/lib/api";
import type { QuestionFormFields } from "@/types/question";
import { toIncorrectAnswerFields } from "@/utils/question";
import { updateQuestion } from "@/lib/api";
import { deleteQuestion } from "@/lib/api";
import { QuestionForm } from "@/components/questions/question-form";
import { QuestionDto } from "@/types/question";
import { questionDtoToForm } from "@/utils/question";
import { formToUpdateQuestionDto } from "@/utils/question";

export default function EditQuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState< QuestionFormFields | null >(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (typeof id === "string") {
      fetchQuestionById(id)
      .then((dto: QuestionDto | null) => {
          if (!dto) {
            setNotFound(true);
            return;
          }
          setQuestion(questionDtoToForm(dto));
        })
        .catch(() => setError("Impossible de charger la question"));
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-red-500">
        😬 Cette question est introuvable. Elle a peut-être été supprimée.<br />
        <a href="/questions/list" className="text-blue-400 underline">Retour à la liste</a>
      </div>
    );
  }


  if (!question && !error) return <div>Chargement…</div>;

  const initialValues: QuestionFormFields = {
    ...question!,
    incorrectAnswers: toIncorrectAnswerFields(question.incorrectAnswers),
  };

  const handleSubmit = async (data: QuestionFormFields) => {
    setError(null);
    setSuccess(false);

    try {
      const payload = formToUpdateQuestionDto(data);
      await updateQuestion(id as string, payload);
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Erreur lors de la mise à jour.");
    }
  };


  const handleDelete = async () => {
    setError(null);
    setSuccess(false);

    try {
      await deleteQuestion(id as string);
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Erreur lors de la suppression.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <QuestionForm
        initialValues={initialValues}
        mode="edit"
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
      {success && (
        <div className="text-green-600 mt-2">
          ✅ Question mise à jour !
        </div>
      )}
      {error && (
        <div className="text-red-600 mt-2">
          {error}
        </div>
      )}
    </div>
  );

}
