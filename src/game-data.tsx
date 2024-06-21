export let squares = Array(9).fill(null);
export let currentMove = 0;

export function setData(nextSquares: any) {
  squares = nextSquares;
  currentMove += 1;
}

export function reset() {
  squares = Array(9).fill(null);
  currentMove = 0;
}
