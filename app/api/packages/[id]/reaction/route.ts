import {NextRequest,NextResponse} from 'next/server';
import {db,authorized} from '@/lib/db';
import {z} from 'zod';
export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 const id=(await params).id,p=await db.package.findUnique({where:{id}});
 if(!p?.openedAt||!p.reactionHash||!authorized(req.cookies.get(`reaction-${id}`)?.value??null,p.reactionHash))return NextResponse.json({error:'Reactions are available on the device that first opened this box.'},{status:403});
 const parsed=z.object({reaction:z.enum(['❤️','😭','🥹','🙏']).nullable(),note:z.string().trim().max(500)}).safeParse(await req.json().catch(()=>null));
 if(!parsed.success||(!parsed.data.reaction&&!parsed.data.note))return NextResponse.json({error:'Choose a reaction or write a short note.'},{status:400});
 await db.package.update({where:{id},data:{recipientReaction:parsed.data.reaction,recipientNote:parsed.data.note}});
 return NextResponse.json({ok:true});
}
