import React, { Suspense } from "react";
import { TriangleLoader } from "../../../shared/loader";

const Area = React.lazy(() => import("./Area"));
export function LazyArea() {
  return (
    <Suspense
      fallback={
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <TriangleLoader />
        </div>
      }
    >
      <Area />
    </Suspense>
  );
}
