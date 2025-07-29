import { Badge } from "@/components/ui/badge";
import { ucfirst } from "@/lib/utils";

type Difficulty = "easy" | "medium" | "hard" | string;

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  easy: "bg-[#173f39] text-[#40bb70]",
  medium: "bg-[#413c28] text-[#e0b918]",
  hard: "bg-[#412634] text-[#c35b5f]",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const style = DIFFICULTY_STYLES[difficulty] ?? "bg-gray-100 text-gray-700";
  return (
    <Badge
      className={`
        text-[10px] font-extrabold shadow-none rounded-mid
        ${style}
      `}
      style={{ minWidth: 50, justifyContent: "center", height: 22 }}
    >
      {ucfirst(difficulty)}
    </Badge>
  );
}