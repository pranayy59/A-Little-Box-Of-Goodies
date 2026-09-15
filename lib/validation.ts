import {z} from 'zod';
import {catalog} from './catalog';
const content = z.string().max(1500000).refine(v => !v || /^https:\/\//.test(v) || /^data:(image\/(png|jpeg|webp)|audio\/(webm|ogg|mp4|mpeg|wav))(;codecs=[a-z0-9-]+)?;base64,[A-Za-z0-9+/=]+$/.test(v) || (!v.includes('://') && !v.startsWith('data:')), 'Use a secure HTTPS link or an uploaded image/audio file.');
export const boxSchema = z.object({to:z.string().trim().max(60),from:z.string().trim().max(60),isAnonymous:z.boolean(),template:z.string().max(40).nullable(),items:z.array(z.object({type:z.enum(catalog.map(c=>c.type)),qty:z.number().int().min(1).max(9),note:z.string().max(500),content})).max(10)}).refine(b=>new Set(b.items.map(i=>i.type)).size===b.items.length,'Each goodie type must be unique.');
export function ready(b:z.infer<typeof boxSchema>){return b.to.length>0 && (b.isAnonymous||b.from.length>0)&&b.items.length>0;}
