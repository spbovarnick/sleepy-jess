"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "next-sanity";
import { client } from "@/utils/sanity/lib/client";


const Nav = () => {
    const [artNavTitles, setArtNavTitles] = useState([])

    const query = `*[_type == 'art_page' && !(_id in path("drafts.**"))]{
        'navTitle': nav_title, 
        'slug': slug.current,
        'homepage': homepage,
        _id
    }|order(orderRank)`

    useEffect(() => {
        (async () => {
            await client
                .fetch(query)
                .then((res) =>{
                    const setHomeSlug = res.map(item => ({
                        ...item,
                        slug: item.homepage ? '' : item.slug
                    }))
                    console.log(res)
                    setArtNavTitles(setHomeSlug)
                })
        })().catch((err) => {
            console.log(err)
        })
    },[]);

    console.log(artNavTitles)

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