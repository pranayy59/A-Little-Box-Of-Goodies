import {NextRequest,NextResponse} from 'next/server';
import {db,hash,secret} from '@/lib/db';
export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 const id=(await params).id,p=await db.package.findUnique({where:{id}});
 if(!p||p.status!=='sent')return NextResponse.json({error:'This package was not found.'},{status:404});
 const key=`reaction-${id}`,existing=req.cookies.get(key)?.value;
 const token=existing||secret();
 const won=await db.package.updateMany({where:{id,openedAt:null},data:{openedAt:new Date(),reactionHash:hash(token)}});
 const canReact=!!won.count || (!!existing&&hash(existing)===p.reactionHash);
 const res=NextResponse.json({ok:true,canReact});
 if(won.count)res.cookies.set(key,token,{httpOnly:true,sameSite:'lax',secure:req.nextUrl.protocol==='https:',path:`/api/packages/${id}`,maxAge:60*60*24*365});
 return res;
}
