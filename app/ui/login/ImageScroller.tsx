"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageScroller() {
  const [activeImages, setActiveImages] = useState<string[]>(["bowl", "pizza", "sushi"]);

  useEffect(() => {
    setInterval(() => {
      const index1 = Math.floor(Math.random() * imageNames.length);
      const index2 = Math.floor(Math.random() * imageNames.length);
      const index3 = Math.floor(Math.random() * imageNames.length);

      setActiveImages([imageNames[index1], imageNames[index2], imageNames[index3]]);
    }, 5000);
  }, []);

  return (
    <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:bg-sky-100 lg:h-screen">
      <Image
        src={`/images/${activeImages[0]}.png`}
        alt="Restaurant image"
        width={2076}
        height={1107}
        loading="eager"
        className="object-contain object-center h-[30%]"
      />
      <Image
        src={`/images/${activeImages[1]}.png`}
        alt="Restaurant image"
        width={2076}
        height={1107}
        loading="eager"
        className="object-contain object-center h-[30%] mt-3"
      />
      <Image
        src={`/images/${activeImages[2]}.png`}
        alt="Restaurant image"
        width={2076}
        height={1107}
        loading="eager"
        className="object-contain object-center h-[30%] mt-3"
      />
    </div>
  );
}

const imageNames = [
  "bowl",
  "bowl2",
  "burger",
  "burger2",
  "burrito",
  "cake",
  "cornflakes",
  "dumplings",
  "ice_cream",
  "kebabs",
  "pasta",
  "pasta2",
  "pizza",
  "popsicles",
  "sushi"
];