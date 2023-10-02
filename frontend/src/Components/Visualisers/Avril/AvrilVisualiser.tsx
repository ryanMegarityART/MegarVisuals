import React, { useEffect, useRef, useState } from "react";
import { getBoundingRect } from "../../../Utils/canvas";
import { Canvas } from "../../Canvas";
import { Avril } from "./Avril";

export const AvrilVisualiser = () => {
  const domRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<any>(null);
  const rect = getBoundingRect(domRef);

  function cancelAllAnimationFrames() {
    var id = window.requestAnimationFrame(function () {});
    while (id--) {
      window.cancelAnimationFrame(id);
    }
  }

  useEffect(() => {
    cancelAllAnimationFrames();
    Avril(domRef);
  }, [context, domRef]);

  return <div ref={domRef}></div>;
};
