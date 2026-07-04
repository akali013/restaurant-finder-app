import Image from "next/image";

export default function ImageScroller() {
  return (
    <div className="flex flex-col items-center justify-center bg-sky-100 h-screen">
      <Image
        src="/caleb15.jpg"
        alt="Restaurant image"
        width={2076}
        height={1107}
        loading="eager"
        className="object-contain object-center h-[30%]"
      />
      <Image
        src="/IMG_E1800.JPG"
        alt="Restaurant image"
        width={2076}
        height={1107}
        loading="eager"
        className="object-contain object-center h-[30%] mt-3"
      />
      <Image
        src="/IMG_E2340.JPG"
        alt="Restaurant image"
        width={2076}
        height={1107}
        loading="eager"
        className="object-contain object-center h-[30%] mt-3"
      />
    </div>
  );
}