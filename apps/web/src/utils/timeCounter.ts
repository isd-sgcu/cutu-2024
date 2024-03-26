let currentSegment:
  | { start: number; last: number; timer: ReturnType<typeof setTimeout> }
  | undefined;
let totalTime = 0;

export function tickTime() {
  if (!currentSegment) {
    currentSegment = {
      start: performance.now(),
      last: performance.now(),
      timer: setTimeout(() => {
        collectTime();
      }, 2000),
    };
  } else {
    clearTimeout(currentSegment.timer);
    currentSegment.timer = setTimeout(() => {
      collectTime();
    }, 2000);
    currentSegment.last = performance.now();
  }
}

export function peekTime() {
  if (currentSegment) {
    const time =
      performance.now() -
      currentSegment.start +
      Math.min(performance.now() - currentSegment.last, 2000);
    return totalTime + time;
  }
  return totalTime;
}

export function collectTime() {
  if (currentSegment) {
    const time =
      performance.now() -
      currentSegment.start +
      Math.min(performance.now() - currentSegment.last, 2000);
    totalTime += time;
    clearTimeout(currentSegment.timer);
    currentSegment = undefined;
  }
  return totalTime;
}

export function resetTime() {
  if (currentSegment?.timer) {
    clearTimeout(currentSegment.timer);
  }
  totalTime = 0;
  currentSegment = undefined;
}