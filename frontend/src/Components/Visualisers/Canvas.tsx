import React, { useRef, useEffect } from "react";

interface CanvasProps {
  width: number;
  height: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  context: any;
  setContext: any;
}

export const canvasDefaultSizeProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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
      const context = canvas.getContext("2d");
      if (context) {
        context.beginPath();
        context.arc(50, 50, 50, 0, 2 * Math.PI);
        context.fill();
      }
    }
  });

  return <canvas ref={canvasRef} height={height} width={width} />;
};
