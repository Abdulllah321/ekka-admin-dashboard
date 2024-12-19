import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import ReactImageMagnify from "react-image-magnify";
import { IMAGE_BASE_URL } from "../../constants";
import { Navigation } from "swiper/modules";

// Define types for the product details
interface ProductDetails {
  name: string;
  thumbnail: string;
  imageUrls: string[];
}

interface ProductImageSlidersProps {
  productDetails: ProductDetails;
}

const ProductImageSliders: React.FC<ProductImageSlidersProps> = ({
  productDetails,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0); // Track active index of the main slider
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  ); // Store the Swiper instance

  useEffect(() => {
    setActiveIndex(0); // Set initial active index when productDetails changes
  }, [productDetails]);

  const handleSlideChange = (swiper: any) => {
    const index = swiper.realIndex; // realIndex gives the correct index in loop mode
    setActiveIndex(index);
  };

  const handleThumbnailClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index); // Jump to the clicked thumbnail's corresponding slide
    }
  };

  return (
    <div className="single-product-scroll">
      {/* Main Image Slider */}
      <Swiper
        className="single-product-cover"
        loop
        onSlideChange={handleSlideChange} // Sync active index
        onSwiper={setSwiperInstance} // Store swiper instance
      >
        <SwiperSlide className="single-slide">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: productDetails.name,
                isFluidWidth: true,
                src: IMAGE_BASE_URL + productDetails?.thumbnail,
              },
              largeImage: {
                src: IMAGE_BASE_URL + productDetails?.thumbnail,
                width: 1200,
                height: 1800,
              },
              enlargedImageStyle: {
                background: "white",
              },
              enlargedImagePosition: "over",
              shouldUsePositiveSpaceLens: true,
            }}
          />
        </SwiperSlide>
        {productDetails.imageUrls.map((img, index) => (
          <SwiperSlide key={index} className="single-slide">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: productDetails.name,
                  isFluidWidth: true,
                  src: IMAGE_BASE_URL + img,
                },
                largeImage: {
                  src: IMAGE_BASE_URL + img,
                  width: 1200,
                  height: 1800,
                },
                enlargedImageContainerDimensions: {
                  width: "150%",
                  height: "100%",
                },
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Navigation Slider */}
      <Swiper
        className="single-nav-thumb"
        slidesPerView="auto"
        modules={[Navigation]}
        spaceBetween={10}
        loop
        navigation
        style={{
          paddingBottom: "5px",
        }}
      >
        <SwiperSlide
          className={`single-slide ${activeIndex === 0 ? "active" : ""}`}
          style={{
            width: "93px",
            height: "93px",
            cursor: "pointer",
          }}
          onClick={() => handleThumbnailClick(0)} // Make first thumbnail clickable
        >
          <img
            className="img-responsive"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              objectFit: "cover",
              border: "3px solid transparent",
              outline:
                activeIndex === 0
                  ? "3px solid #6D88C2"
                  : "3px solid transparent",
              transition: ".5s all",
            }}
            src={IMAGE_BASE_URL + productDetails?.thumbnail}
            alt={productDetails.name}
          />
        </SwiperSlide>
        {productDetails.imageUrls.map((img, index) => (
          <SwiperSlide
            key={index}
            className={`single-slide ${activeIndex === index + 1 ? "active" : ""}`}
            style={{
              width: "93px",
              height: "93px",
              cursor: "pointer",
            }}
            onClick={() => handleThumbnailClick(index + 1)} // Make each thumbnail clickable
          >
            <img
              className="img-responsive"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 10,
                border: "3px solid transparent",
                outline:
                  activeIndex === index + 1
                    ? "3px solid #6D88C2"
                    : "3px solid transparent",
                transition: ".5s all",
              }}
              src={IMAGE_BASE_URL + img}
              alt={productDetails.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSliders;
