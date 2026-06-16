"use client";

import { assets } from "@/assets/assets";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import CategoriesMarquee from "./CategoriesMarquee";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Hero = () => {
  const sliderImages = [
    assets.slider_1,
    assets.slider_2,
    assets.slider_3,
    assets.slider_4,
    assets.slider_5,
  ];

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  return (
    <div className="mx-6">
      <div className="flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10">
        {/* LEFT HERO */}
        <div
          className="relative flex-1 bg-green-200 rounded-3xl overflow-hidden"
          style={{
            minHeight: "550px",
          }}
        >
          {/* CONTENT */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "40px",
              maxWidth: "600px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                background: "#9AE6B4",
                color: "#16A34A",
                padding: "6px 16px 6px 6px",
                borderRadius: "999px",
                fontSize: "14px",
              }}
            >
              <span
                style={{
                  background: "#4B5563",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "12px",
                }}
              >
                NEWS
              </span>

              50$ ve Üzeri Siparişlerde Ücretsiz Kargo!

              <ChevronRightIcon size={16} />
            </div>

            <h2
              style={{
                fontSize: "56px",
                lineHeight: "1.15",
                fontWeight: "600",
                marginTop: "20px",
                marginBottom: "20px",
                maxWidth: "550px",
                background:
                  "linear-gradient(to right, #475569, #A0FF74)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Açılışa özel kayıt olun<br /> %25 indirim <br />kazanın
              
            </h2>

            <div
              style={{
                marginTop: "30px",
                color: "#334155",
                fontWeight: "500",
              }}
            >
              <p>Starts from</p>

              <p
                style={{
                  fontSize: "42px",
                  marginTop: "10px",
                }}
              >
                {currency}4.90
              </p>
            </div>

            <button
              style={{
                marginTop: "35px",
                background: "#1E293B",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "16px 36px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Daha Fazla Bilgi
            </button>
          </div>

          {/* SLIDER */}
          <div
            style={{
              position: "absolute",
              right: "0",
              bottom: "0",
              width: "45%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {sliderImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src={img}
                      alt={`slide-${index}`}
                      fill
                      priority={index === 0}
                      style={{
                        objectFit: "contain",
                        objectPosition: "bottom center",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm">
          <div
            style={{
              background: "#FED7AA",
              borderRadius: "24px",
              padding: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: "180px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "32px",
                  fontWeight: "600",
                  maxWidth: "180px",
                  marginBottom: "20px",
                }}
              >
                En Popüler Ürünler
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Daha Fazla Bilgi
                <ArrowRightIcon size={18} />
              </div>
            </div>

            <Image
              src={assets.hero_product_img1}
              alt=""
              width={140}
              height={140}
            />
          </div>

          <div
            style={{
              background: "#BFDBFE",
              borderRadius: "24px",
              padding: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: "180px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "32px",
                  fontWeight: "600",
                  maxWidth: "180px",
                  marginBottom: "20px",
                }}
              >
En iyi fiyatlar               </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Daha Fazla Bilgi
                <ArrowRightIcon size={18} />
              </div>
            </div>

            <Image
              src={assets.hero_product_img2}
              alt=""
              width={140}
              height={140}
            />
          </div>
        </div>
      </div>

      <CategoriesMarquee />
    </div>
  );
};

export default Hero;