import "./App.css";
import logoBlue from "./assets/logoBlue.jpg";
import { TopNav } from "./Components/Nav/TopNav";
import { Canvas, canvasDefaultProps } from "./Components/Visualisers/Canvas";

function App() {
  return (
    <div className="App">
      <TopNav />
      <Canvas {...canvasDefaultProps} />
    </div>
  );
}

export default App;
