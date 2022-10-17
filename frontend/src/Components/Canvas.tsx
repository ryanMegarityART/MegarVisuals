import React, { useRef, useEffect } from "react";

interface CanvasProps {
  width: number;
  height: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  context: any;
  setContext: any;
}

export const Canvas = ({
  width,
  height,
  canvasRef,
  context,
  setContext,
}: CanvasProps) => {
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      setContext(canvas.getContext("2d"));
    }
  });

  return <canvas ref={canvasRef} height={height} width={width} />;
};
