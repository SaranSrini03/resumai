export function extractFieldsFromText(text: string) {
  const nameMatch = text.match(/Name[:\s]*(.+)/i);
  const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i);
  const phoneMatch = text.match(/\+?\d[\d\s().-]{8,}/);

  return {
    name: nameMatch?.[1]?.trim() || "",
    email: emailMatch?.[0] || "",
    phone: phoneMatch?.[0] || "",
    summary: text.slice(0, 300).trim() + "..."
  };
}
