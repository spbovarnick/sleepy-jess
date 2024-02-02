import Link from "next/link";
import ClientNav from "./ClientNav";
import { sanityFetch } from "@/utils/api/sanityFetch";
import ClientImg from "../ClientImg";

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

    const res = await sanityFetch({
      query: query,
      qParams: {},
      tags: ['art_page', 'non_art_page']
    })
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
      logo{
        alt,
        asset->{
          ...,
          metadata
        }
      }
    }`
    const res = await sanityFetch({
      query: query,
      qParams: {},
      tags: ['logo']
    })
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default async function Nav(){
  const {artPages, nonArtPages} = await fetchData();
  const logo = await fetchLogo();
  const logoImg = logo?.logo;

  return (
    <nav className='h-full relative flex flex-col md:min-w-fit  md:p-9 md:sticky md:top-0'>
      <div className="ml-4 mt-2 order-2 md:order-1 md:m-0" >
        <Link href={'/'} className="text-xl" >
          Jess Ackerman
        </Link>
        <br/>
        <Link href={'https://www.instagram.com/sleepyjess/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=='} className="text-sm text-gray-600 pl-2 hover:text-sky-500 transition-all" target="_blank">
          @sleepyjess
        </Link>
      </div>
      { logoImg && 
        <div className="my-4 hidden order-2 md:block flex max-w-[200px]">
          {logoImg && 
            <ClientImg 
              img={logoImg}
              sizes={"(min-wdith: 768px) 200px"}
              classes={"hidden order-2 md:block  "}
            />
          }
        </div>
      }
      <ClientNav artPages={artPages} nonArtPages={nonArtPages} />
    </nav>
  )
}