import {NextRequest,NextResponse} from 'next/server';
import {db,authorized,publicBox} from '@/lib/db';
import {boxSchema,ready} from '@/lib/validation';
type Context={params:Promise<{id:string}>};
export async function GET(req:NextRequest,{params}:Context){
 const p=await db.package.findUnique({where:{id:(await params).id}});
 if(!p||!authorized(req.headers.get('x-sender-token'),p.senderHash))return NextResponse.json({error:'This private sender link is not valid.'},{status:404});
 return NextResponse.json({...publicBox(p),from:p.from},{headers:{'Cache-Control':'no-store'}});
}
export async function PATCH(req:NextRequest,{params}:Context){
 const id=(await params).id,p=await db.package.findUnique({where:{id}});
 if(!p||!authorized(req.headers.get('x-sender-token'),p.senderHash))return NextResponse.json({error:'This private sender link is not valid.'},{status:404});
 try {
  const raw=await req.text();if(raw.length>6000000)return NextResponse.json({error:'Your box is too large.'},{status:413});
  const body=JSON.parse(raw),parsed=boxSchema.safeParse(body);
  if(!parsed.success)return NextResponse.json({error:'Please check your names and goodies.'},{status:400});
  if(body.publish&&!ready(parsed.data))return NextResponse.json({error:'Add a recipient, sender, and at least one goodie.'},{status:400});
  const updated=await db.package.updateMany({where:{id,openedAt:null},data:{...parsed.data,items:JSON.stringify(parsed.data.items),...(body.publish?{status:'sent'}:{})}});
  if(!updated.count)return NextResponse.json({error:'This box has been opened. Make a new version to keep their original safe.',opened:true},{status:409});
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'Could not save your box.'},{status:400});}
}
