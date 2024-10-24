import React, { Suspense } from "react";

const Monument = React.lazy(() => import("./BudhaMonument.tsx"));

export const LazyBudhaMonument = () => {
  return (
    <Suspense fallback={null}>
      <Monument />
    </Suspense>
  );
};
