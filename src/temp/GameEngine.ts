type Stone = "black" | "white";
type Point = {
  x: number;
  y: number;
};

export class GoGameEngine {
  private board: (Stone | null)[][];
  private boardSize: number;
  private currentTurn: Stone;
  private capturedStones: { black: number; white: number };

  constructor(boardSize: number = 19) {
    this.boardSize = boardSize;
    this.board = Array.from({ length: boardSize }, () =>
      Array(boardSize).fill(null)
    );
    this.currentTurn = "black";
    this.capturedStones = { black: 0, white: 0 };
  }

  // Check if the move is valid
  isMoveValid(point: Point): boolean {
    const { x, y } = point;
    if (x < 0 || y < 0 || x >= this.boardSize || y >= this.boardSize)
      return false; // Out of bounds
    if (this.board[x][y] !== null) return false; // Spot already taken
    return true;
  }

  // Make a move
  makeMove(point: Point): boolean {
    if (!this.isMoveValid(point)) return false;
    const { x, y } = point;
    this.board[x][y] = this.currentTurn;

    // Check for captures
    this.captureStones(point);

    // Switch turn
    this.switchTurn();
    return true;
  }

  // Switch the current turn
  private switchTurn() {
    this.currentTurn = this.currentTurn === "black" ? "white" : "black";
  }

  // Capture opponent's stones
  private captureStones(point: Point) {
    const opponent = this.currentTurn === "black" ? "white" : "black";
    const capturedGroups: Point[][] = [];

    // Check neighbors for potential captures
    this.getNeighbors(point).forEach((neighbor) => {
      const { x, y } = neighbor;
      if (this.board[x][y] === opponent) {
        const group = this.findGroup(neighbor, opponent);
        if (this.isGroupCaptured(group)) {
          capturedGroups.push(group);
        }
      }
    });

    // Capture stones
    capturedGroups.forEach((group) => {
      group.forEach(({ x, y }) => {
        this.board[x][y] = null;
      });
      this.capturedStones[opponent]++;
    });
  }

  // Find a group of stones
  private findGroup(
    point: Point,
    stone: Stone,
    visited: Set<string> = new Set()
  ): Point[] {
    const group: Point[] = [];
    const stack: Point[] = [point];
    visited.add(`${point.x},${point.y}`);

    while (stack.length > 0) {
      const current = stack.pop()!;
      group.push(current);

      this.getNeighbors(current).forEach((neighbor) => {
        const { x, y } = neighbor;
        if (this.board[x][y] === stone && !visited.has(`${x},${y}`)) {
          visited.add(`${x},${y}`);
          stack.push(neighbor);
        }
      });
    }

    return group;
  }

  // Check if a group of stones is captured (surrounded)
  private isGroupCaptured(group: Point[]): boolean {
    return group.every((stone) =>
      this.getNeighbors(stone).every(({ x, y }) => this.board[x][y] !== null)
    );
  }

  // Get neighbors of a point on the board
  private getNeighbors({ x, y }: Point): Point[] {
    const neighbors: Point[] = [];
    if (x > 0) neighbors.push({ x: x - 1, y });
    if (x < this.boardSize - 1) neighbors.push({ x: x + 1, y });
    if (y > 0) neighbors.push({ x, y: y - 1 });
    if (y < this.boardSize - 1) neighbors.push({ x, y: y + 1 });
    return neighbors;
  }

  // Print the current board state
  public printBoard() {
    console.log(
      this.board
        .map((row) =>
          row
            .map((stone) =>
              stone === "black" ? "B" : stone === "white" ? "W" : "."
            )
            .join(" ")
        )
        .join("\n")
    );
  }

  // Get the number of captured stones
  public getCapturedStones(): { black: number; white: number } {
    return this.capturedStones;
  }

  // Evaluate a move based on multiple factors
  private evaluateMove(point: Point, player: Stone): number {
    let score = 0;

    // Bonus for center of the board
    const center = Math.floor(this.boardSize / 2);
    const distanceToCenter =
      Math.abs(point.x - center) + Math.abs(point.y - center);
    score -= distanceToCenter; // Closer to center gives higher score

    // Capturing opponent's stones
    const opponent = player === "black" ? "white" : "black";
    const capturedStones = this.simulateCapture(point, player);
    score += capturedStones.length * 10; // Each capture adds points

    // Risk of self-capture
    const selfCaptureRisk = this.simulateCapture(point, opponent);
    score -= selfCaptureRisk.length * 5; // Possible self-captures reduce score

    return score;
  }

  // Simulate a move and check for captures (does not modify the actual board)
  private simulateCapture(point: Point, player: Stone): Point[] {
    const simulatedBoard = this.cloneBoard();
    simulatedBoard[point.x][point.y] = player;

    const opponent = player === "black" ? "white" : "black";
    const capturedStones: Point[] = [];

    this.getNeighbors(point).forEach((neighbor) => {
      const { x, y } = neighbor;
      if (simulatedBoard[x][y] === opponent) {
        const group = this.findGroup(neighbor, opponent);
        if (this.isGroupCaptured(group)) {
          capturedStones.push(...group);
        }
      }
    });

    return capturedStones;
  }

  // Clone the board
  private cloneBoard(): (Stone | null)[][] {
    return this.board.map((row) => row.slice());
  }
  public findBestMove(): Point | null {
    let bestMove: Point | null = null;
    let bestScore = -Infinity;

    // Iterate over all possible points on the board
    for (let x = 0; x < this.boardSize; x++) {
      for (let y = 0; y < this.boardSize; y++) {
        const point: Point = { x, y };

        // Check if the move is valid
        if (this.isMoveValid(point)) {
          // Evaluate the move
          const score = this.evaluateMove(point, this.currentTurn);

          // Update the best move if the score is higher
          if (score > bestScore) {
            bestScore = score;
            bestMove = point;
          }
        }
      }
    }

    return bestMove;
  }
}
