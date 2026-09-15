'use client';
import {Heart,Stamp} from 'lucide-react';
import {Box} from '@/lib/catalog';
export function ShippingLabel({box,onChange}:{box:Box;onChange?:(b:Box)=>void}){
 return <section className="shipping-label" aria-label="Shipping label"><div className="label-top"><span>THE LITTLE GOODIES POST</span><span>HANDLE WITH LOVE ♡</span></div><div className="label-body"><div className="address"><label><span>to</span>{onChange?<input maxLength={60} placeholder="Someone special" aria-label="Recipient name" value={box.to} onChange={e=>onChange({...box,to:e.target.value})}/>:<strong>{box.to}</strong>}</label><label><span>from</span>{onChange&&!box.isAnonymous?<input maxLength={60} placeholder="Your name" aria-label="Sender name" value={box.from} onChange={e=>onChange({...box,from:e.target.value})}/>:<strong>{box.isAnonymous?'A secret admirer':box.from}</strong>}</label></div><div className="postage"><Heart size={26} strokeWidth={1.4}/><span>A LITTLE<br/>LOVE INSIDE</span><small>♡ 01 ♡</small></div></div><div className="label-bottom"><span className="barcode" aria-hidden="true"/><span>NO DISTANCE TOO FAR. NO REASON TOO SMALL.</span><Stamp size={18}/></div></section>;
}
