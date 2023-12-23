'use client';
import { motion } from 'framer-motion'; 
import { useEffect, useRef } from 'react';
import { register }  from 'swiper/element/bundle';
import Image from 'next/image';
import './swiper.css';

export default function Carousel({gallery}) {
  const swiperRef = useRef(null);
  
  useEffect(() => {
    register();

    const params = {
      // modules: [Navigation, Pagination],
      injectStylesURLs: [
        './swiper.css',
        'swiper/element/css/navigation',
        'swiper/element/css/pagination'
      ],
      on: { init() {}}
    }

    Object.assign(swiperRef.current, params);
    
    swiperRef.current.initialize();
  }, [])
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} >
      <swiper-container 
        navigation="true" 
        pagination="true" 
        ref={swiperRef} 
        style={{
          "--swiper-navigation-color": "rgb(14 165 233)",
          "--swiper-pagination-color": "rgb(249 115 22)",
        }}
      >
        {gallery && gallery.map((slide, i) => (
          <swiper-slide key={i} >
            <div className='h-full md:h-[calc(100vh-150px)] w-auto object-contain flex flex-col justify-center pb-6' >
              <Image 
                src={slide.img_url} 
                alt={slide.img_alt} 
                width={500}
                height={500}
                loading="lazy"
                className='object-contain'
              />
              {slide.attribution && 
                <p className={"text-gray-400 italic text-xs"}
                >Photo by {slide.attribution}</p>
              }
              {slide.caption && 
                <p className={"text=sm"}>{slide.caption}</p>
              }
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </motion.div>
  )
}