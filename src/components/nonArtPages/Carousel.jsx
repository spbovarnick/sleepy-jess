'use client'
import React, { useEffect, useRef, useState } from 'react';
import { register }  from 'swiper/element/bundle';


export default function Carousel({gallery}) {
  const swiperRef = useRef(null);

  useEffect(() => {
    register();

    const params = {
      injectStyles: [
        `
        .swiper-button-next, .swiper-button-prev {
          transition: all .5s linear
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          transform: scale(2);
        }
      `,
      ],
      // injectStylesUrls: ['./carousel.module.css']
    }

    Object.assign(swiperRef.current, params);
    
    swiperRef.current.initialize();
  }, [])
  
  return (
    <>
      <swiper-container 
        navigation="true" 
        pagination="true" 
        init="false" 
        ref={swiperRef} 
        style={{
          "--swiper-navigation-color": "rgb(14 165 233)",
          "--swiper-pagination-color": "rgb(249 115 22)",
        }}
      >
        {gallery && gallery.map((slide, i) => (
          <swiper-slide key={i}>
            <img src={slide.img_url} alt={slide.img_alt} />
            <p>{slide.caption}</p>
          </swiper-slide>
        ))}
      </swiper-container>
    </>
  )
}