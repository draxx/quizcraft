"use client";

import { Card, CardContent } from "@/components/ui/card";

import { useEffect, useState } from "react";
import { fetchQuestions } from "@/lib/api";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";

type QuestionListItem = {
  id: string;
  localizedId: string;
  question: string;
  difficulty: string;
};

function QuestionsList() {
  const [questions, setQuestions] = useState<QuestionListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions()
      .then(setQuestions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <>
        {questions.map((q) => (
          <Link key={q.id} href={`/questions/${q.localizedId}`}>
            <Card className="cursor-pointer hover:scale-[1.02] transition">
                <CardContent className="text-sm font-bold">
                    <Badge>{q.difficulty}</Badge><br/>
                    {q.question}
                </CardContent>
            </Card>
          </Link>
        ))}
    </>
    );
}

export default function QuestionsListPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="title text-2xl">Liste des questions</h1>
      <QuestionsList />
    </div>
  );
}