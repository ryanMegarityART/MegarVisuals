import React from "react";
import Select from "react-select";
import { shapeOptions } from "../../Utils/shapes";

export const NoiseOptions = ({ params, setParams }: any) => {
  console.log(params);
  return (
    <div>
      <h5>Options</h5>
      <Select
        placeholder="select shape.."
        options={shapeOptions}
        onChange={(e) => {
          console.log(e);
          setParams({ ...params, shape: e.value });
        }}
      />
    </div>
  );
};
