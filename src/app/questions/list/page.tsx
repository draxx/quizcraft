"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useEffect, useState } from "react";
import { fetchQuestions } from "@/lib/api";
import { Badge } from "@/components/ui/badge"


function QuestionsList() {
  const [questions, setQuestions] = useState<any[]>([]);
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
        <Card key={q.id}>
            <CardContent className="text-sm font-bold">
                <div className="text-xs">{q.baseId}</div>
                <Badge>{q.difficulty}</Badge><br/>
                {q.question}
            </CardContent>
        </Card>
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