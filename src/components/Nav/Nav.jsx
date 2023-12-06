import Link from "next/link";
import Image from "next/image";
import { client } from "@/utils/sanity/lib/client";
// import NavArtItem from "./NavArtItem";
import ClientNav from "./ClientNav";

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
          'years': art_gallery[]|order(date desc).date
        }
      }`

    const res = await client.fetch(query)
    const artPages = res.filter(page => page.type === 'art_page').map(item => (
      {
      ...item,
      years: item.years?.map((year) => year && year.slice(0, year.indexOf('-')))
    }));
    const nonArtPages = res.filter(page => page.type === 'non_art_page');
    return { artPages, nonArtPages}
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function fetchLogo() {
  try {
    const query = `*[_type == 'logo'][0]{
      "logoUrl": logo.asset->url
    }`
    const res = await client.fetch(query);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default async function Nav(){
  const {artPages, nonArtPages} = await fetchData();
  const {logoUrl} = await fetchLogo();

  return (
    <nav className='md:w-48 h-full flex flex-col md:m-9'>
      <div className="flex justify-between order-2 px-9 md:order-1 md:px-0">
        <Link href={'/'} className="text-xl" >
          Jess Ackerman
        </Link>
        <span className="md:hidden">menu</span>
      </div>
      <Image 
        src={logoUrl}
        width={500}
        height={500}
        alt="Jess Ackerman's web logo"
        className="my-4 hidden md:block"
      />
      <ClientNav artPages={artPages} nonArtPages={nonArtPages} />
    </nav>
  )
}