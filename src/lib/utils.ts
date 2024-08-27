export function notesDate(slug: string) {
  return new Date(slug.split("/").slice(0, 3).join("/"));
}
