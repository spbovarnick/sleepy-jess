import Link from "next/link";
import Image from "next/image";
import { client } from "@/utils/sanity/lib/client";
import NavArtItem from "./NavArtItem";

async function fetchData() {
  try {
    const query = `*[_type in ['non_art_page', 'art_page']]|order(orderRank){
        'type': _type,
        'navTitle': nav_title, 
        'slug': slug.current,
        'homepage': homepage,
        orderRank,
        _id,
        defined(art_gallery[].date) => {
          'years': art_gallery[].date
        }
      }`

    const res = await client.fetch(query)
    const artPages = res.filter(page => page.type === 'art_page').map(item => (
      {
      ...item,
      // slug: item.homepage ? '' : item.slug,
      years: item.years?.map((year) => year && year.slice(0, year.indexOf('-')))
    }));
    const nonArtPages = res.filter(page => page.type === 'non_art_page');
    return { artPages, nonArtPages}
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default async function Nav(){
  const {artPages, nonArtPages} = await fetchData();

  return (
    <nav className='w-48 h-full flex flex-col m-9'>
      <Link href={'/'}>
        Jess Ackerman
      </Link>
      <Image 
        src="/logo-placeholder.png"
        width={500}
        height={500}
        // className='w-full h-full'
        alt="Jess Ackerman's web logo"
      />
      <div className="primary-nav">
        <ul>
          {artPages.length > 0 && (
            artPages.map( (link) => (
              <NavArtItem key={link._id} data={link} />
            ))
          )}
          <li>
            <Link href={'https://sleepyjess.bigcartel.com/'}>
              Shop
            </Link>
          </li>
        </ul>
      </div>
      <div className="secondary-nav">
        <ul>
          {nonArtPages.length > 0 &&
            nonArtPages.map( (link) => (
              <li key={link._id + link.slug}>
                <Link href={`/${link.slug}`}>
                  {link.navTitle}
                </Link>
              </li>
            ))
          }
          <li>
            <Link href={'/contact'}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}