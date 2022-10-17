import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";
import { Options } from "./Options";
import { Noise } from "./Visualisers/Noise";
import { NoiseVisualiser } from "./Visualisers/NoiseVisualiser";

export interface VisualiserProps {
  visualiserName: string;
}

export const Visualiser = ({ visualiserName }: VisualiserProps) => {
  return (
    <div className="visualiser-container">
      {visualiserName == "noise" && <NoiseVisualiser />}
    </div>
  );
};
