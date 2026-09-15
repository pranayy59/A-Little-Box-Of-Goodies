import {NextRequest,NextResponse} from 'next/server';
import {db,hash,secret} from '@/lib/db';
import {boxSchema} from '@/lib/validation';
export async function POST(req:NextRequest){
 try {
  const raw=await req.text(); if(raw.length>6000000)return NextResponse.json({error:'Your box is too large. Please use smaller files.'},{status:413});
  const parsed=boxSchema.safeParse(JSON.parse(raw));if(!parsed.success)return NextResponse.json({error:'Please check your names and goodies.'},{status:400});
  const token=secret(), id=secret().slice(0,24);const b=parsed.data;
  await db.package.create({data:{...b,items:JSON.stringify(b.items),id,senderHash:hash(token)}});
  return NextResponse.json({id,token},{status:201});
 } catch {return NextResponse.json({error:'Could not save your box. Please try again.'},{status:400});}
}
