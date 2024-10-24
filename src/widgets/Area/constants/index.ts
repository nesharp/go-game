import { degToRad } from "../../../shared/lib/utils";
import { ViewMapKeys, ViewsMapItem } from "../types";

export const ViewsMap: Record<ViewMapKeys, ViewsMapItem> = {
  top: {
    maxAzimuthAngle: degToRad(0),
    minAzimuthAngle: degToRad(0),
    maxPolarAngle: degToRad(0),
    minPolarAngle: degToRad(0),
  },
  side: {
    maxAzimuthAngle: degToRad(85),
    minAzimuthAngle: degToRad(-85),
    maxPolarAngle: degToRad(65),
    minPolarAngle: degToRad(65),
  },
  free: {
    maxAzimuthAngle: degToRad(85),
    minAzimuthAngle: degToRad(-85),
    maxPolarAngle: degToRad(85),
    minPolarAngle: degToRad(0),
  },
};
