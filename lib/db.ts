import { PrismaClient, Package } from '@prisma/client';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
const globalDb = globalThis as unknown as {db:PrismaClient};
export const db = globalDb.db || new PrismaClient();
if(process.env.NODE_ENV !== 'production') globalDb.db = db;
export const secret = () => randomBytes(32).toString('hex');
export const hash = (s:string) => createHash('sha256').update(s).digest('hex');
export const authorized = (value:string|null, expected:string) => !!value && timingSafeEqual(Buffer.from(hash(value)),Buffer.from(expected));
export function publicBox(p:Package) {
 return {id:p.id,to:p.to,from:p.isAnonymous?'A secret admirer':p.from,isAnonymous:p.isAnonymous,items:JSON.parse(p.items),template:p.template,status:p.status,createdAt:p.createdAt.toISOString(),openedAt:p.openedAt?.toISOString()??null,recipientReaction:p.recipientReaction,recipientNote:p.recipientNote};
}
