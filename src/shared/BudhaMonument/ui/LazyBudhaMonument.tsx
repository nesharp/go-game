import React, { Suspense } from "react";

const Monument = React.lazy(() => import("./BudhaMonument.tsx"));

export const LazyBudhaMonument = () => {
  // const { y, z } = useSpring({
  //   from: {
  //     y: 500,
  //     z: -500,
  //   },
  //   to: {
  //     y: 0,
  //     z: 0,
  //   },
  //   config: { duration: 700 },
  // });
  return (
    <Suspense fallback={null}>
      <Monument
      //  position-y={y} position-z={z}
        />
    </Suspense>
  );
};
