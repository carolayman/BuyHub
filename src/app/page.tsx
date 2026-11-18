import Image from "next/image";
import MainSlider from "./_components/mainSlider/mainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import AllProducts from "./_components/allProducts/allProducts";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <hr className="border-t border-gray-200" />
      </div>
      <AllProducts />
    </>
  );
}
