export function roundUpToNearest500(num: number) {
  const remainder = num % 500;
  if (remainder === 0) {
    return num;
  } else {
    return num + (500 - remainder);
  }
}
