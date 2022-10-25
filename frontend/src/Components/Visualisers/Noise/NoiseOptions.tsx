import Slider from "@mui/material/Slider/Slider";
import React, { useCallback, useState } from "react";
import Select from "react-select";
import { shapeOptions } from "../../../Utils/shapes";

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
      <label>shape</label>
      <Select
        placeholder="select shape.."
        options={shapeOptions}
        defaultValue={shapeOptions[0]}
        onChange={(e: any) => handleParamUpdate({ shape: e.value })}
      />
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
      <label>noise frequency</label>
      <Slider
        key={`frequency-slider-${params.frequency}`}
        defaultValue={params.frequency}
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
        defaultValue={params.amplitude}
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
        key={`scale-slider-${params.scale}`}
        defaultValue={[params.scaleMin, params.scaleMax]}
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
        key={`speed-slider-${params.scale}`}
        defaultValue={[params.speed]}
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
        defaultValue={params.color.r}
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
    </div>
  );
};
