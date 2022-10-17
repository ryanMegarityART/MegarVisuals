import Slider from "@mui/material/Slider/Slider";
import React, { useCallback } from "react";
import Select from "react-select";
import { shapeOptions } from "../../Utils/shapes";

export const NoiseOptions = ({ params, setParams }: any) => {
  const handleParamUpdate = useCallback(
    (updateParamObj: any) => {
      setParams({ ...params, ...updateParamObj });
    },
    [params]
  );

  return (
    <div>
      <h5>Options</h5>
      <label>rows</label>
      <Slider
        key={`row-slider-${params.rows}`}
        defaultValue={params.rows}
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
        defaultValue={params.cols}
        onChangeCommitted={(e: any, value: any) =>
          handleParamUpdate({ cols: value })
        }
        aria-label="cols"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={60}
      />
      <label>speed</label>
      <Slider
        key={`speed-slider-${params.speed}`}
        defaultValue={params.speed}
        onChangeCommitted={(e: any, value: any) =>
          handleParamUpdate({ speed: value })
        }
        aria-label="speed"
        valueLabelDisplay="auto"
        step={0.05}
        min={0}
        max={5}
      />
      <label>shape</label>
      <Select
        placeholder="select shape.."
        options={shapeOptions}
        defaultValue={shapeOptions[0]}
        onChange={(e: any) => handleParamUpdate({ shape: e.value })}
      />
    </div>
  );
};
