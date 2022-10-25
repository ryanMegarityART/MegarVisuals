import React from "react";
import { NoiseOptions } from "./Visualisers/Noise/NoiseOptions";

export const Options = ({ visualiserName }: any) => {
  return (
    <div className="options-section">
      <h4>Options</h4>
      <div>{visualiserName == "noise" && <NoiseOptions />}</div>
    </div>
  );
};
