"use client"

import Link from "next/link";
import { client } from "@/utils/sanity/lib/client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Nav = () => {
    const [artNavTitles, setArtNavTitles] = useState([])

    const query = `*[_type == 'art_page']{
        'navTitle': nav_title, 
        'slug': slug.current,
        'homepage': homepage
    }|order(orderRank)`

    useEffect(() => {
        (async () => {
            await client
                .fetch(query)
                .then((res) =>{
                    setArtNavTitles(res)
                })
        })().catch((err) => {
            console.log(err)
        })
    },[])

    return (
        <nav className='fixed top-0 left-0 w-44 flex flex-col m-9'>
            <Image 
                src="/logo-placeholder.png"
                width={500}
                height={500}
                className='w-full h-full'
                alt='Sleepy Jess logo'
            />
            <div>
                {artNavTitles.length > 0 && (
                    artNavTitles.map( (link, i) => (
                        <li key={i}>
                        <Link
                            
                            href={`/${link.slug}`}
                        >
                            {link.navTitle}
                        </Link>
                        </li>
                    ))
                )}
            </div>
        </nav>
    )
}

export default Nav;