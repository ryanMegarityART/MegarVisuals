import React, { useRef, useState } from "react";
import { getBoundingRect } from "../../../Utils/canvas";
import { Canvas } from "../../Canvas";

export const LinesVisualiser = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<any>(null);
  const rect = getBoundingRect(canvasRef);
  const width = rect && rect.width ? rect.width : 300;
  const height = rect && rect.height ? rect.height : 300;
  return (
    <div>
      LinesVisualiser
      <Canvas
        width={width}
        height={height}
        canvasRef={canvasRef}
        context={context}
        setContext={setContext}
      />
    </div>
  );
};
