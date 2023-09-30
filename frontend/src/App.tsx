import { useCallback, useState } from "react";
import { Container } from "react-bootstrap";
import Select from "react-select";
import "./App.css";
import { TopNav } from "./Components/TopNav";
import { Visualiser } from "./Components/Visualiser";
import { cancelAllAnimationFrames } from "./Utils/animations";
import {
  reactSelectStyles,
  reactSelectTheme,
} from "./Utils/react-select-styles";
const options = [{ value: "noise", label: "Noise" }];

function App() {
  const [selectedVisualiser, setSelectedVisualiser] = useState<any>(null);

  const updateSelectedVisualiser = useCallback(
    (e: any) => {
      cancelAllAnimationFrames();
      if (e && e.value) {
        setSelectedVisualiser(e.value);
      }
    },
    [setSelectedVisualiser]
  );

  return (
    <div>
      <TopNav />
      <Container>
        <div className="py-3">
          <Select
            placeholder="Select visualiser preset.."
            options={options}
            onChange={updateSelectedVisualiser}
            styles={reactSelectStyles}
            theme={reactSelectTheme}
          />
          <div className="py-3">
            {selectedVisualiser && (
              <Visualiser visualiserName={selectedVisualiser} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
