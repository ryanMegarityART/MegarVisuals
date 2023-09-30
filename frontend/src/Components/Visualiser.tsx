import { NoiseVisualiser } from "./Visualisers/Noise/NoiseVisualiser";

export interface VisualiserProps {
  visualiserName: string;
}

export const Visualiser = ({ visualiserName }: VisualiserProps) => {
  return <>{visualiserName == "noise" && <NoiseVisualiser />}</>;
};
