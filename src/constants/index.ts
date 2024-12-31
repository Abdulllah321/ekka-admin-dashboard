import { Product } from "../slices/productSlice";

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove duplicate hyphens
};

export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASEURL;

export const getImageUrl = (url: string) => {
  if (url.startsWith("uploads")) {
    return `${IMAGE_BASE_URL}${url}`;
  } else {
    return url;
  }
};

export const getPrice = (product: Product) => {
  if (product.discountPercentage !== 0) {
    return product.discountPrice;
  } else {
    return product.price;
  }
};