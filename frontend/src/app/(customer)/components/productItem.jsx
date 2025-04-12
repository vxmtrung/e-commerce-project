'use client';
import Image from "next/image";

class Product {
  id;
  img;
  name;
  description;
  status;
  categoryId;
  brandId;

  constructor({ id, img, name, price, description, status, categoryId, brandId }) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.price = price;
    this.description = description;
    this.status = status; 
    this.categoryId = categoryId;
    this.brandId = brandId;
  }
}

class Category {
  id;
  name;

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

class Brand {
  id;
  name;

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

export default function ProductItem() {
  const product = new Product({
    id: "566e4b29-43b9-42d5-863f-ca040f11a692",
    img: "https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg",
    name: "Kem dưỡng ẩm",
    price: 205000,
    description: "Kem dưỡng ẩm chăm sóc da",
    status: true,
    categoryId: "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
    brandId: "5bb58152-26be-43ac-8fd5-48b44a77e444"
  });

  const brand = new Brand({
    id: "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
    name: "Dưỡng da"
    });

  const category = new Category({
    id: "5bb58152-26be-43ac-8fd5-48b44a77e444",
    name: "AquaGlow"
    }
  );

  return (
    <div
      key={product.id}
      className="border rounded-xl shadow-sm p-3 hover:shadow-md transition duration-300"
    >
    <div className="relative w-full h-60 mb-2">
      <Image
        src={product.img}
        alt={product.name}
        fill
        className="object-contain"
      />
    </div>
    <div className="text-orange-600 font-semibold text-lg">
      {product.price.toLocaleString("vi-VN")} ₫
    </div>
    <div className="font-bold mt-1">{product.name}</div>
    <div className="text-gray-600 text-sm">{product.description}</div>
  </div>
  );
}