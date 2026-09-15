import {Sender} from '@/components/Sender';
export const metadata={title:'Wrap & send | A Little Box of Goodies',robots:{index:false,follow:false}};
export default async function SendPage({params}:{params:Promise<{id:string}>}){return <Sender id={(await params).id}/>;}
