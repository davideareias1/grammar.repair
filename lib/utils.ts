export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function jsonResponse(data: unknown, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
