export function formatDate(
  dateString: string,
  locale: string = "en-US"
): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString; // fail gracefully
  }

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
