export async function fetchQuestions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
    },
  });

  if (!res.ok) throw new Error("Erreur lors du chargement des questions");
  return res.json();
}