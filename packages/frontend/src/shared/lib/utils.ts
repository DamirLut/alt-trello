export function pickRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function arraySwap<T>(array: T[], x: number, y: number) {
  const b = array[y];
  array[y] = array[x];
  array[x] = b;
  return array;
}

export function debounce(func: (...args: unknown[]) => unknown, timeout = 300) {
  let timer: Timer;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
