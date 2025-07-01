"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function QuestionCreatePage() {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", ""]);
  const [error, setError] = useState<string | null>(null);

  const handleIncorrectChange = (index: number, value: string) => {
    setIncorrectAnswers((prev) =>
      prev.map((ans, i) => (i === index ? value : ans))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !question.trim() ||
      !correctAnswer.trim() ||
      incorrectAnswers.some((a) => !a.trim())
    ) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    setError(null);
    console.log({
      question,
      correctAnswer,
      incorrectAnswers,
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Concoter une question</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex : Quel est le plus grand océan ?"
                required
              />
            </div>
            <div>
              <Label htmlFor="correct-answer">Bonne réponse</Label>
              <Input
                id="correct-answer"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Ex : Océan Pacifique"
                required
              />
            </div>
            <div>
              <Label>Distracteurs</Label>
              <div className="space-y-2">
                {incorrectAnswers.map((ans, idx) => (
                  <Input
                    key={idx}
                    value={ans}
                    onChange={(e) =>
                      handleIncorrectChange(idx, e.target.value)
                    }
                    placeholder={`Mauvaise réponse ${idx + 1}`}
                    required
                  />
                ))}
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <Button type="submit" variant="outline" className="w-full">
              Sauvegarder
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}