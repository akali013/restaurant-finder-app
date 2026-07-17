import Slider from "@mui/material/Slider";
import { MouseEventHandler, useState } from "react";


// Slider labels and marks
const marks = [
  { value: 0, label: "0 mi" },
  { value: 5, label: "5 mi" },
  { value: 10, label: "10 mi" },
  { value: 15, label: "15 mi" },
  { value: 20, label: "20 mi" },
  { value: 25, label: "25 mi" },
  { value: 30, label: "30 mi" },
];

export default function DistanceFilterTab({ miles, onMilesChange, onClick }: { miles: number, onMilesChange: (miles: number) => void, onClick: MouseEventHandler<HTMLButtonElement> }) {

  return (
    <div className="flex justify-center items-center px-10 py-3">
      <Slider
        aria-label="Distance in miles"
        defaultValue={0}
        valueLabelDisplay="on"
        step={5}
        min={0}
        max={30}
        value={miles}
        onChange={(_, value) => onMilesChange(value)}
        marks={marks}
      />

      <button className="bg-sky-200 ml-10 rounded-full" onClick={onClick}>
        OK
      </button>
    </div>
  );
}