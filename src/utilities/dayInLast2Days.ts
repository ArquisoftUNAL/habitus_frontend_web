export function dayInLast2Days(day: string) {
  // Return true if day is today or yesterday
  return (
    day === new Date().toISOString().slice(0, 10) ||
    day ===
      new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10)
  );
}
