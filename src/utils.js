export function range(length, start = 0) {
  return Array.from({ length }, (_x, i) => i + start);
}
