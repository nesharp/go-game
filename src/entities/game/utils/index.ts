import _ from "lodash";
import { Howl } from "howler";
export const playStoneSound = () => {
  const sound = new Howl({
    src: ["/sounds/stone.mp3"],
    volume: 0.6,
    rate: 1.2,
    sprite: {
      v1: [0, 1000],
      v2: [50, 1000],
    },
  });

  const r = _.random(1, 2);
  sound.play(`v${r}`);
};
