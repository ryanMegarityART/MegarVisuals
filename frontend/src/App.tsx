import { useEffect, useRef, useState } from "react";
import "./App.css";
import logoBlue from "./assets/logoBlue.jpg";
import { TopNav } from "./Components/Nav/TopNav";
import {
  Canvas,
  canvasDefaultSizeProps,
} from "./Components/Visualisers/Canvas";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    if (context) {
      context.beginPath();
      context.arc(50, 50, 50, 0, 2 * Math.PI);
      context.fill();
    }
  }, context);

  return (
    <div className="App">
      <TopNav />
      <Canvas
        canvasRef={canvasRef}
        context={context}
        setContext={setContext}
        {...canvasDefaultSizeProps}
      />
    </div>
  );
}

export default App;
