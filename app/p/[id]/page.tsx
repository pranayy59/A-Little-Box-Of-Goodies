import {notFound} from 'next/navigation';
import {db,publicBox} from '@/lib/db';
import {UnboxingAnimation} from '@/components/UnboxingAnimation';
import type {Metadata} from 'next';
export const dynamic='force-dynamic';
type Props={params:Promise<{id:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const id=(await params).id;const p=await db.package.findUnique({where:{id}});if(!p||p.status!=='sent')return {title:'A little lost in the post',robots:{index:false,follow:false}};const title=`A little box for ${p.to} ♡`;const description=`${p.isAnonymous?'A secret admirer':p.from} sent you a little box of goodies. Tap to unwrap a little care.`;return {title,description,robots:{index:false,follow:false},openGraph:{title,description,type:'website',url:`/p/${id}`,images:[{url:`/p/${id}/og`,width:1200,height:630,alt:`A little box for ${p.to}`}]},twitter:{card:'summary_large_image',title,description,images:[`/p/${id}/og`]}};}
export default async function PackagePage({params}:Props){const p=await db.package.findUnique({where:{id:(await params).id}});if(!p||p.status!=='sent')notFound();return <UnboxingAnimation box={{...publicBox(p),recipientReaction:null,recipientNote:null}}/>;}
