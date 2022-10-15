import { useState } from "react";
import Select from "react-select";
import "./App.css";
import { TopNav } from "./Components/TopNav";
import { Visualiser } from "./Components/Visualiser";

const options = [{ value: "noise", label: "Noise" }];

function cancelAllAnimationFrames() {
  var id = window.requestAnimationFrame(function () {});
  while (id--) {
    window.cancelAnimationFrame(id);
  }
}

function App() {
  const [selectedVisualiser, setSelectedVisualiser] = useState<any>(null);

  return (
    <div>
      <TopNav />
      <div className="content">
        <Select
          placeholder="select visualiser.."
          options={options}
          onChange={(e) => {
            cancelAllAnimationFrames();
            if (e && e.value) {
              setSelectedVisualiser(e.value);
            }
          }}
        />
        <div className="content">
          {selectedVisualiser && (
            <Visualiser visualiserName={selectedVisualiser} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
