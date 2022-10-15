import React, { useEffect, useRef, useState } from "react";
import { Canvas, canvasDefaultSizeProps } from "./Canvas";
import { Noise } from "./Visualisers/Noise";

export interface VisualiserProps {
  visualiserName: string;
}

export const Visualiser = ({ visualiserName }: VisualiserProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    if (context) {
      if (visualiserName == "noise") {
        Noise(context);
      }
    }
  }, [context, visualiserName]);

  return (
    <Canvas
      canvasRef={canvasRef}
      context={context}
      setContext={setContext}
      {...canvasDefaultSizeProps}
    />
  );
};
