declare module "weiqi" {
  export function createGame(size: 9 | 13 | 19): any;
  export function play(
    game: any,
    player: "black" | "white",
    position: [number, number]
  ): any;
  export function pass(game: any, player: "black" | "white"): any;
  export function isOver(game: any): boolean;
  export function areaScore(game: any, komi: number): number;
}
