import { useState, useEffect } from "react";
import Image from "next/image";
// Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
// Models
import { Product } from "@/models/interface/Product.interface";
// Assets
import { Trash } from "lucide-react";

interface ICarouselPreviewImages {
  newProduct: Product;
  handleRemoveImage: any;
}

export const CarouselPreviewImages = ({
  newProduct,
  handleRemoveImage,
}: ICarouselPreviewImages) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mt-10 mr-7 ml-7 relative">
      <Carousel setApi={setApi}>
        <button
          className="rounded-full p-2 bg-red-600 z-10 top-1 left-1 cursor-pointer hover:bg-red-500 absolute"
          onClick={() => {
            setIsRemoved(!isRemoved);
            handleRemoveImage(newProduct.images[current - 1]);
          }}
        >
          <Trash size={20} color="white" strokeWidth={2} />
        </button>
        <CarouselContent>
          {newProduct?.images.map((image) => (
            <CarouselItem key={image}>
              <Image
                src={image}
                alt={"Preview"}
                className="w-full h-full object-cover aspect-square rounded-xl overflow-hidden bg-gray-100"
                width={400}
                height={400}
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="text-gray-400 text-center mt-1">
        {current}/{newProduct.images.length}
      </p>
    </div>
  );
};
