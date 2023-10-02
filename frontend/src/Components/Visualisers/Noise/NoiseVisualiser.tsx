import React, { useEffect, useRef, useState } from "react";
import { getBoundingRect } from "../../../Utils/canvas";
import { Canvas } from "../../Canvas";
import { Noise } from "./Noise";
import { NoiseOptions } from "./NoiseOptions";

export interface VisualiserProps {
  visualiserName: string;
}

export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface NoiseParams {
  rows: number;
  cols: number;
  scaleMin: number;
  scaleMax: number;
  frequency: number;
  amplitude: number;
  lineCap: CanvasLineCap;
  shape: string;
  toggleFlash: boolean;
  toggleImage: boolean;
  color: Color;
  speed: number;
  fftSize: number;
  smoothingConstant: number;
}

export const NoiseVisualiser = () => {
  const [params, setParams] = useState<NoiseParams>({
    rows: 25,
    cols: 25,
    scaleMin: 10,
    scaleMax: 100,
    frequency: 10,
    amplitude: 50,
    lineCap: "round",
    shape: "rectangle",
    toggleFlash: false,
    toggleImage: false,
    color: { r: 100, g: 255, b: 50 },
    speed: 50,
    fftSize: 32,
    smoothingConstant: 0.95,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<any>(null);
  const rect = getBoundingRect(canvasRef);
  const width = rect && rect.width ? rect.width : 300;
  const height = rect && rect.height ? rect.height : 300;

  function cancelAllAnimationFrames() {
    var id = window.requestAnimationFrame(function () {});
    while (id--) {
      window.cancelAnimationFrame(id);
    }
  }

  useEffect(() => {
    cancelAllAnimationFrames();
    Noise(canvasRef, params);
  }, [context, canvasRef, params]);

  return (
    <div className="d-flex flex-row">
      <div className="options-section">
        <NoiseOptions params={params} setParams={setParams} />
      </div>
      <div className="visualiser-canvas">
        <Canvas
          width={width}
          height={height}
          canvasRef={canvasRef}
          context={context}
          setContext={setContext}
        />
      </div>
    </div>
  );
};
