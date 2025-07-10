"use client";

import React from "react";
import type { QuestionFormFields } from "@/types/question";
import { createQuestion } from "@/lib/api";
import { QuestionForm } from "@/components/questions/question-form";
import { formToCreateQuestionDto } from "@/utils/question";

export default function QuestionCreatePage() {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (data: QuestionFormFields) => {
    setError(null);
    setSuccess(false);
    try {
      const questionDto = formToCreateQuestionDto(data);
      await createQuestion(questionDto);
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <QuestionForm
        mode="create"
        onSubmit={handleSubmit}
      />
      {success && (
        <div className="text-green-600 mt-2">
          🎉 Question créée avec succès !
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