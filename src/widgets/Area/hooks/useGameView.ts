import { useEffect } from "react";
import { ViewsMap } from "../constants";
import { ViewMapKeys } from "../types";
import gsap from "gsap";

export const useGameView = (view: ViewMapKeys = "free", ref: any) => {
  useEffect(() => {
    if (ref.current) {
      const { maxAzimuthAngle, minAzimuthAngle, maxPolarAngle, minPolarAngle } =
        ViewsMap[view];

      gsap.to(ref.current, {
        maxAzimuthAngle,
        minAzimuthAngle,
        maxPolarAngle,
        minPolarAngle,
        duration: 0.8,
        ease: "sine",
      });
    }
  }, [view]);
  return ViewsMap[view];
};
