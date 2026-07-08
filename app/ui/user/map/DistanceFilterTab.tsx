import Slider from "@mui/material/Slider";

const marks = [
  { value: 0, label: "0 mi" },
  { value: 10, label: "10 mi" },
  { value: 20, label: "20 mi" },
  { value: 30, label: "30 mi" },
  { value: 40, label: "40 mi" },
  { value: 50, label: "50 mi" },

];

export default function DistanceFilterTab() {
  return (
    <div className="flex justify-center items-center px-10 py-3">
      <Slider
        aria-label="Distance in miles"
        defaultValue={0}
        valueLabelDisplay="on"
        step={10}
        min={0}
        max={50}
        marks={marks}
      />

      <button className="bg-sky-200 ml-10 rounded-full">
        OK
      </button>
    </div>
  );
}