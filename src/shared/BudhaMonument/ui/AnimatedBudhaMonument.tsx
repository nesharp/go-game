import { easings, useSpring } from "@react-spring/three";
import BudhaMonument from "./BudhaMonument";

export const AnimatedBudhaMonument = () => {
  const { z, y } = useSpring({
    z: -30,
    y: -5,
    from: { z: -500, y: 200 },

    config: {
      duration: 700,
      easing: easings.easeInCubic,
    },
    delay: 500,
  });
  return <BudhaMonument position-y={y} position-z={z} />;
};
