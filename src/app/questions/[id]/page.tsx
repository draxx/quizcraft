"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchQuestionById } from "@/lib/api";
import { QuestionForm } from "@/components/questions/question-form";
import type { QuestionFormFields } from "@/types/question";
import { toIncorrectAnswerFields } from "@/utils/question";

export default function EditQuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState< QuestionFormFields | null >(null);

  useEffect(() => {
    if (typeof id === "string") {
      fetchQuestionById(id).then(setQuestion);
    }
  }, [id]);

  if (!question) return <div>Chargement…</div>;

  const initialValues: QuestionFormFields = {
    ...question,
    incorrectAnswers: toIncorrectAnswerFields(question.incorrectAnswers),
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <QuestionForm
        initialValues={initialValues}
        mode="edit"
        onSubmit={(data) => {
          console.log("Mettre à jour question", data);
        }}
      />
    </div>
  );

}
