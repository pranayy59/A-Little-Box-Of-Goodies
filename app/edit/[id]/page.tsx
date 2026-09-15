import {Sender} from '@/components/Sender';
export const metadata={title:'Edit your box | A Little Box of Goodies',robots:{index:false,follow:false}};
export default async function EditPage({params}:{params:Promise<{id:string}>}){return <Sender id={(await params).id} edit/>;}
