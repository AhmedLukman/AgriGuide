"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faLocationDot,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { cn, Image } from "@nextui-org/react";
import { ProductWithSuppliers } from "@/lib/types";
import { useRouter } from "next/navigation";

const AgrochemicalsList = ({
  productsWithSupplier,
}: {
  productsWithSupplier: {
    city: string;
    country: string;
    price: number;
    product: {
      id: string;
      name: string;
    };
    supplier: {
      name: string;
    };
    id: string;
    images: string[];
  }[];
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
      {productsWithSupplier.map((product) => {
        const productName = product.product.name;
        const productPrice = product.price;
        const supplierName = product.supplier.name;
        const supplierLocation = `${product.city}, ${product.country}`;
        const productImage = product.images[0];
        const productId = product.id;

        return (
          <CardContainer key={productId} className="w-full">
            <CardBody className="relative group/card w-full h-auto shadow-lg shadow-emerald-200 rounded-xl border border-emerald-400 p-6">
              <div
                onClick={() => router.push(`/store/product/${productId}`)}
                className="cursor-pointer"
              >
                <CardItem
                  translateZ="50"
                  as="div"
                  className="flex justify-between w-full"
                >
                  <h2 className="text-xl text-emerald-800 font-bold">
                    {productName}
                  </h2>
                  <div className="text-emerald-800 space-x-2">
                    <FontAwesomeIcon icon={faCoins} />
                    <span>Ksh. {productPrice}</span>
                  </div>
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={productImage}
                    height="500"
                    width="500"
                    className="h-72 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <CardItem
                  translateZ={80}
                  as="div"
                  className="flex w-full justify-between mt-4"
                >
                  <div className="space-x-2 text-emerald-800">
                    <FontAwesomeIcon icon={faShop} />
                    <span>{supplierName}</span>
                  </div>
                  <div className="space-x-2 text-emerald-800">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{supplierLocation}</span>
                  </div>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        );
      })}
    </div>
  );
};

export default AgrochemicalsList;
