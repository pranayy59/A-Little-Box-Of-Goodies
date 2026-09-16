import {NextRequest,NextResponse} from 'next/server';
import {db,hash,secret} from '@/lib/db';
import {boxSchema} from '@/lib/validation';
export async function POST(req:NextRequest){
 let stage='read body';
 try {
  const raw=await req.text(); if(raw.length>6000000)return NextResponse.json({error:'Your box is too large. Please use smaller files.'},{status:413});
  stage='parse JSON';
  const body=JSON.parse(raw);
  stage='validate body';
  const parsed=boxSchema.safeParse(body);if(!parsed.success){
   console.error('[POST /api/packages] Validation failed',parsed.error);
   return NextResponse.json({error:'Please check your names and goodies.'},{status:400});
  }
  stage='create package';
  const token=secret(), id=secret().slice(0,24);const b=parsed.data;
  await db.package.create({data:{...b,items:JSON.stringify(b.items),id,senderHash:hash(token)}});
  return NextResponse.json({id,token},{status:201});
 } catch(error){
  console.error(`[POST /api/packages] Failed to ${stage}`,error);
  return NextResponse.json({error:'Could not save your box. Please try again.'},{status:stage==='parse JSON'&&error instanceof SyntaxError?400:500});
 }
}
