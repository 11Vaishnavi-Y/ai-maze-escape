const STORAGE_KEY = "mazeLeaderboard";

export function saveScore(score) {
  const scores = getLeaderboard();

  scores.push(score);

  scores.sort((a, b) => {
    if (a.time !== b.time) {
      return a.time - b.time;
    }

    return a.moves - b.moves;
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(scores.slice(0, 10))
  );
}

export function getLeaderboard() {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );
}

export function clearLeaderboard() {
  localStorage.removeItem(STORAGE_KEY);
}