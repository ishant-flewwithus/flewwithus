export function formatMinutes(minutes: number) {
  if (minutes < 0) throw new Error("Minutes cannot be negative");

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
