"use client";

import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SquarePen, Trash2 } from "lucide-react";

import { useEffect, useState } from "react";
import { fetchQuestions } from "@/lib/api";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import Link from "next/link";

type QuestionListItem = {
  id: string;
  localizedId: string;
  question: string;
  difficulty: string;
};

function QuestionsList() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions()
      .then(setQuestions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/questions/${id}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Supprimer la question ${id}`);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return questions.map((q) => (
    
    <Link key={q.localizedId} href={`/questions/${q.localizedId}`}>
      <Card className="cursor-pointer transition-colors duration-200 hover:bg-[rgba(255,255,255,0.04)] relative group">
        <CardHeader>
          <div className="flex items-center justify-between">
            <DifficultyBadge difficulty={q.difficulty} />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(q.localizedId);
                }}
                className="cursor-pointer rounded-md p-2 bg-muted hover:bg-primary hover:text-primary-foreground transition-colors border border-border shadow focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Modifier"
              >
                <SquarePen size={12} />
              </button>
              <button
                type="button"
                onClick={(e) => handleDelete(q.localizedId, e)}
                className="cursor-pointer rounded-md p-2 bg-muted hover:bg-destructive hover:text-destructive-foreground transition-colors border border-border shadow focus:outline-none focus:ring-2 focus:ring-destructive"
                aria-label="Supprimer"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-sm font-extrabold">
          {q.question}
        </CardContent>
      </Card>
    </Link>
  ));
}

export default function QuestionsListPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <QuestionsList />
    </div>
  );
}
