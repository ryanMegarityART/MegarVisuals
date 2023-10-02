import { AvrilVisualiser } from "./Visualisers/Avril/AvrilVisualiser";
import { LinesVisualiser } from "./Visualisers/Lines/LinesVisualiser";
import { NoiseVisualiser } from "./Visualisers/Noise/NoiseVisualiser";

export interface VisualiserProps {
  visualiserName: "noise" | "lines" | "avril";
}

export const Visualiser = ({ visualiserName }: VisualiserProps) => {
  return (
    <>
      {visualiserName == "noise" && <NoiseVisualiser />}
      {visualiserName === "lines" && <LinesVisualiser />}
      {visualiserName === "avril" && <AvrilVisualiser />}
    </>
  );
};
