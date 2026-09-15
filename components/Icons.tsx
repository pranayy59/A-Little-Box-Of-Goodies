import {Candy,Music2,Quote,Disc3,Gamepad2,Image,Mic,Pencil,HeartHandshake,CupSoda,Package} from 'lucide-react';
import {catalog,ItemType} from '@/lib/catalog';
const icons={Candy,Music2,Quote,Disc3,Gamepad2,Image,Mic,Pencil,HeartHandshake,CupSoda};
export function GoodieIcon({type,size=34}:{type:ItemType;size?:number}){const item=catalog.find(i=>i.type===type);const Icon=item?icons[item.icon]:Package;return <Icon size={size} strokeWidth={1.5} aria-hidden="true"/>;}
