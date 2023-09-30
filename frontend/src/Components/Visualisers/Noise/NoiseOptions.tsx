import Slider from "@mui/material/Slider/Slider";
import React, { useCallback, useState } from "react";
import Select from "react-select";
import {
  reactSelectStyles,
  reactSelectTheme,
} from "../../../Utils/react-select-styles";
import { shapeOptions } from "../../../Utils/shapes";
import { NoiseParams } from "./NoiseVisualiser";

interface NoiseOptionsProps {
  params: NoiseParams;
  setParams: React.Dispatch<React.SetStateAction<NoiseParams>>;
}

const FFT_OPTIONS = [
  { value: "32", label: "32" },
  { value: "64", label: "64" },
  { value: "128", label: "128" },
  { value: "256", label: "256" },
  { value: "512", label: "512" },
];

export const NoiseOptions = ({ params, setParams }: NoiseOptionsProps) => {
  const handleParamUpdate = useCallback(
    (updateParamObj: Partial<NoiseParams>) => {
      setParams({ ...params, ...updateParamObj });
    },
    [params]
  );

  return (
    <div>
      <h5>Options</h5>
      <label>shape</label>
      <Select
        placeholder="select shape.."
        options={shapeOptions}
        value={shapeOptions[0]}
        onChange={(e: any) => handleParamUpdate({ shape: e.value })}
        styles={reactSelectStyles}
        theme={reactSelectTheme}
      />
      <label>rows</label>
      <Slider
        key={`row-slider-${params.rows}`}
        value={params.rows}
        onChangeCommitted={(e: any, value: any) =>
          handleParamUpdate({ rows: value })
        }
        aria-label="rows"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={60}
      />
      <label>columns</label>
      <Slider
        key={`col-slider-${params.cols}`}
        value={params.cols}
        onChangeCommitted={(e: any, value: any) =>
          handleParamUpdate({ cols: value })
        }
        aria-label="cols"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={60}
      />
      <label>noise frequency</label>
      <Slider
        key={`frequency-slider-${params.frequency}`}
        value={params.frequency}
        onChangeCommitted={(e: any, value: any) =>
          handleParamUpdate({ frequency: value })
        }
        aria-label="frequency"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={100}
      />
      <label>noise amplitude</label>
      <Slider
        key={`amplitude-slider-${params.amplitude}`}
        value={params.amplitude}
        onChangeCommitted={(e: any, value: any) =>
          handleParamUpdate({ amplitude: value })
        }
        aria-label="amplitude"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={100}
      />
      <label>scale</label>
      <Slider
        key={`scale-slider-${params.scaleMin}`}
        value={[params.scaleMin, params.scaleMax]}
        onChangeCommitted={(e: any, value: any) =>
          handleParamUpdate({ scaleMin: value[0], scaleMax: value[1] })
        }
        aria-label="scale"
        valueLabelDisplay="auto"
        step={0.5}
        min={1}
        max={250}
      />
      <label>speed</label>
      <Slider
        key={`speed-slider-${params.speed}`}
        value={[params.speed]}
        onChangeCommitted={(e: any, value: any) =>
          handleParamUpdate({ speed: value })
        }
        aria-label="speed"
        valueLabelDisplay="auto"
        step={0.5}
        min={0}
        max={100}
      />
      <label>color</label>
      <Slider
        key={`scale-slider-${params.color.r}`}
        value={params.color.r}
        onChangeCommitted={(e: any, value: any) =>
          handleParamUpdate({
            color: { r: value, g: Math.random() * 255, b: Math.random() * 255 },
          })
        }
        aria-label="color-r"
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={255}
        color="secondary"
      />
      <label>FFT Size</label>
      <Select
        placeholder="select shape.."
        options={FFT_OPTIONS}
        value={FFT_OPTIONS.filter((o) => parseInt(o.value) === params.fftSize)}
        onChange={(e: any) => handleParamUpdate({ fftSize: parseInt(e.value) })}
        styles={reactSelectStyles}
        theme={reactSelectTheme}
      />
      <label>FFT Smoothing</label>
      <Slider
        key={`scale-slider-fftSmoothing`}
        value={params.smoothingConstant}
        onChangeCommitted={(e: any, value: any) =>
          handleParamUpdate({
            smoothingConstant: value,
          })
        }
        aria-label="fft-smoothing"
        valueLabelDisplay="auto"
        step={0.01}
        min={0}
        max={0.99}
        color="secondary"
      />
    </div>
  );
};
