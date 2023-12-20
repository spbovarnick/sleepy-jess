'use client';
import { PortableText } from '@portabletext/react';
import { useEffect, useRef, useState } from 'react';
import { register }  from 'swiper/element/bundle';
import Image from 'next/image';
import './swiper.css';

const blurbComponents = {
  marks: {
    link: ({ value, children }) => {
      return (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-sky-500 transition-all"
        >
          {children}
        </a>
      )
    }
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
    number: ({ children }) => <ol className="list-inside list-decimal">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li >{children}</li>
  }
}

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
    <>
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
            {/* <div className='m-auto h-full w-full md:w-3/4 flex flex-col pb-6' > */}
            <div className='m-auto max-h-fit-content max-w-fit-content flex flex-col pb-6' >
              <img 
                src={slide.img_url} 
                alt={slide.img_alt} 
                // width={500}
                // height={500}
                loading="lazy"
                className='max-h-[calc(100vh-88px)] md:max-h-[calc(100vh-78px)] object-contain'
              />
              {slide.attribution && 
                <p className={"text-gray-400 italic text-xs"}
                >Photo by {slide.attribution}</p>
              }
              {slide.caption && 
                <p className={"text=sm"}>{slide.caption}</p>
              }
              {slide.blurb && 
                <PortableText
                  value={slide.blurb}
                  components={blurbComponents}
                />
              }
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </>
  )
}