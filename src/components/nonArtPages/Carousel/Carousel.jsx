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
      injectStylesURLs: [
        './swiper.css'
      ],
      on: { init() {}}
    }

    Object.assign(swiperRef.current, params);
    
    swiperRef.current.initialize();
  }, [])
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} >
      <swiper-container 
        css-mode="true"
        init="false"
        navigation="true" 
        pagination="true" 
        lazy="true"
        ref={swiperRef} 
        style={{
          "--swiper-navigation-color": "rgb(14 165 233)",
          "--swiper-pagination-color": "rgb(249 115 22)",
        }}
      >
        {gallery && gallery.map((slide, i) => (
          <swiper-slide key={i} >
            <div className='m-auto max-h-[calc(100vh-124px)] md:max-h-[calc(100vh-78px)] object-contain flex flex-col pb-6' >
              <Image 
                src={slide.img_url} 
                alt={slide.img_alt} 
                width={500}
                height={500}
                loading="lazy"
                className='w-full h-full object-contain'
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