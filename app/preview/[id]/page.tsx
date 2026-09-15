import {Preview} from '@/components/Preview';
export const metadata={title:'Private preview | A Little Box of Goodies',robots:{index:false,follow:false}};
export default async function PreviewPage({params}:{params:Promise<{id:string}>}){return <Preview id={(await params).id}/>;}
