export function getBoundingRect(canvasRef: any) {
  return canvasRef && canvasRef.current && canvasRef.current.parentElement
    ? canvasRef.current.parentElement.getBoundingClientRect()
    : null;
}
