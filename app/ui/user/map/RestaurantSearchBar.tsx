import Image from "next/image";

export default function RestaurantSearchBar() {
  return (
    <form className="flex items-center bg-mauve-200 rounded-4xl py-2 w-full">
      <label htmlFor="restaurant-search-bar">
        <input
          id="restaurant-search-bar"
          name="restaurant-search-bar"
          className="bg-transparent rounded-4xl focus:outline-2 text-2xl w-full py-2 px-10"
          placeholder="Search restaurants..."
        />
      </label>
      <button className="bg-transparent">
        <Image
          src="/icons/search.png"
          alt="Search for restaurants"
          width={45}
          height={45}
        />
      </button>
    </form>
  );
}