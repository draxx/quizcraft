import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextareaAutosize from "react-textarea-autosize";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import type { QuestionFormFields } from "@/types/question";

type QuestionFormProps = {
  initialValues?: QuestionFormFields;
  onSubmit: (data: QuestionFormFields) => void;
  onDelete?: () => void;
  mode?: "create" | "edit";
};

export function QuestionForm({
  initialValues = {
    question: "",
    correctAnswer: "",
    incorrectAnswers: [{ value: "" }, { value: "" }, { value: "" }],
  },
  onSubmit,
  onDelete,
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
          {mode === "edit"
            ? "Transmuter la question"
            : "Concocter une question"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="question">Question</Label>
            <TextareaAutosize
              id="question"
              {...register("question", { required: true })}
              placeholder="Ex : Quel est le plus grand océan ?"
              className="w-full resize-none bg-transparent border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 
              transition"
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
                  {...register(`incorrectAnswers.${i}.value` as const, {
                    required: true,
                  })}
                  placeholder={`Mauvaise réponse ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <Button
            type="submit"
            variant="outline"
            className="w-full"
            disabled={isSubmitting}
          >
            {mode === "edit" ? "Mettre à jour" : "Sauvegarder"}
          </Button>

          {mode === "edit" && onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" className="w-full">
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-black/40 backdrop-blur-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer la question ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Es-tu certain de vouloir
                    supprimer cette question&nbsp;?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>
                    Oui, supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
