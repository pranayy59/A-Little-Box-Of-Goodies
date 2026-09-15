'use client';
import {Plus,Check} from 'lucide-react';
import {catalog,Goodie,ItemType} from '@/lib/catalog';
import {GoodieIcon} from './Icons';
export function ItemGrid({items,onAdd}:{items:Goodie[];onAdd:(type:ItemType)=>void}){return <div className="item-grid">{catalog.map((item,index)=>{const selected=items.find(i=>i.type===item.type);return <article key={item.type} className={`goodie-card ${selected?'in-box':''}`}><span className="card-number">{String(index+1).padStart(2,'0')}</span><div className={`sticker ${item.color}`}><GoodieIcon type={item.type}/></div><h3>{item.name}</h3><p>{item.description}</p><button className={selected?'added':'add-button'} onClick={()=>onAdd(item.type)} aria-label={`${selected?'Customize':'Add'} ${item.name}`}>{selected?<><Check size={15}/>In your box · {selected.qty}</>:<><Plus size={15}/>Add to box</>}</button></article>})}</div>;}
