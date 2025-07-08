import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { QuestionFormFields } from "@/types/question";

type QuestionFormProps = {
  initialValues?: QuestionFormFields;
  onSubmit: (data: QuestionFormFields) => void;
  mode?: "create" | "edit";
};

export function QuestionForm({
  initialValues = {
    question: "",
    correctAnswer: "",
    incorrectAnswers: [{ value: "" }, { value: "" }, { value: "" }],
  },
  onSubmit,
  mode = "create",
}: QuestionFormProps) {

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<QuestionFormFields>({
    defaultValues: initialValues,
  });

  const { fields: incorrectAnswerFields } = useFieldArray<QuestionFormFields>({
    control,
    name: "incorrectAnswers",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "edit" ? "Transmuter la question" : "Concocter une question"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              {...register("question", { required: true })}
              placeholder="Ex : Quel est le plus grand océan ?"
            />
          </div>
          <div>
            <Label htmlFor="correct-answer">Bonne réponse</Label>
            <Input
              id="correct-answer"
              {...register("correctAnswer", { required: true })}
              placeholder="Ex : Océan Pacifique"
            />
          </div>
          <div>
            <Label>Distracteurs</Label>
            <div className="space-y-2">
              {incorrectAnswerFields.map((field, i) => (
                <Input
                  key={field.id}
                  {...register(`incorrectAnswers.${i}.value` as const, { required: true })}
                  placeholder={`Mauvaise réponse ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <Button type="submit" variant="outline" className="w-full" disabled={isSubmitting}>
            {mode === "edit" ? "Mettre à jour" : "Sauvegarder"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}