import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "../Canvas";
import { Options } from "../Options";
import { Noise } from "../Visualisers/Noise";
import { NoiseOptions } from "./NoiseOptions";

export interface VisualiserProps {
  visualiserName: string;
}

export const NoiseVisualiser = () => {
  const [params, setParams] = useState({
    rows: 16,
    cols: 16,
    scaleMin: 0.00001,
    scaleMax: 0.1,
    speed: 2,
    frequency: 10,
    amplitude: 50,
    // frame: 0,
    // animate: true,
    lineCap: "round",
    shape: "smiley-face",
    toggleFlash: false,
    toggleImage: false,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<any>(null);
  const rect =
    canvasRef && canvasRef.current && canvasRef.current.parentElement
      ? canvasRef.current.parentElement.getBoundingClientRect()
      : null;
  const width = rect && rect.width ? rect.width : 300;
  const height = rect && rect.height ? rect.height : 300;

  function cancelAllAnimationFrames(){
    var id = window.requestAnimationFrame(function(){});
    while(id--){
      window.cancelAnimationFrame(id);
    }
 }

  useEffect(() => {
    cancelAllAnimationFrames();
    Noise(canvasRef, context, params);
  }, [context, canvasRef, params]);

  return (
    <div className="visualiser-container">
      <div className="options-section">
        <NoiseOptions params={params} setParams={setParams} />
      </div>
      <div className="visualiser-canvas">
        <Canvas
          height={height}
          width={width}
          canvasRef={canvasRef}
          context={context}
          setContext={setContext}
        />
      </div>
    </div>
  );
};
