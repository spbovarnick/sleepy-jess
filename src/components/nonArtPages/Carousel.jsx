'use client'
import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Carousel({gallery}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, []);

  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination'
      },
    });
  }, [isClient])
  
  return (
    <>
      <div className='swiper'> 
        <div className='swiper-wrapper'>
          {gallery && gallery.map((slide, i) => (
            <div className='swiper-slide' key={i}>
              <img src={slide.img_url} alt={slide.img_alt} />
              <p>{slide.caption}</p>
            </div>
          ))}
        </div>
        <div className='swiper-pagination'></div>
        <div className='swiper-button-prev'></div>
        <div className='swiper-button-next'></div>
      </div>
    </>
  )
}