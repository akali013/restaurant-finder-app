import Image from "next/image";

export default function NoSavedRestaurants() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src="/icons/no_places.png"
        alt="No saved restaurants yet."
        width={50}
        height={50}
      />
      <h1 className="text-3xl mt-10">No saved restaurants yet.</h1>
    </div>
  );
} 