'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {PackageView} from '@/lib/catalog';
import {UnboxingAnimation} from './UnboxingAnimation';
export function Preview({id}:{id:string}){const [box,setBox]=useState<PackageView|null>(null);const [error,setError]=useState('');useEffect(()=>{let t=location.hash.slice(1);try{t=t||localStorage.getItem(`sender-${id}`)||'';}catch{}fetch(`/api/packages/${id}`,{headers:{'x-sender-token':t}}).then(async r=>{const d=await r.json();if(!r.ok)throw Error(d.error);setBox(d);}).catch(e=>setError(e.message));},[id]);return box?<UnboxingAnimation box={box} preview/>:<main className="center-page"><h1>{error?'This preview needs your private link.':'Wrapping up your preview…'}</h1>{error&&<Link className="primary" href="/">Make your own box →</Link>}</main>;}
