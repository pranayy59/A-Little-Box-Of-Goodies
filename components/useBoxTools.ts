'use client';
import {useEffect,useRef} from 'react';
import {flushSync} from 'react-dom';
import {Box,catalog} from '@/lib/catalog';
import {boxSchema} from '@/lib/validation';
type Tool={name:string;description:string;inputSchema:object;annotations:object;execute:(input:unknown)=>unknown};
type ModelContext={registerTool:(tool:Tool,options:{signal:AbortSignal})=>void|Promise<void>};
export function useBoxTools(box:Box,onChange:(b:Box)=>void){
 const current=useRef({box,onChange});
 current.current={box,onChange};
 useEffect(()=>{
  const context=(document as Document&{modelContext?:ModelContext}).modelContext;
  if(!context?.registerTool)return;
  const life=new AbortController();
  const register=(tool:Tool)=>{try{Promise.resolve(context.registerTool(tool,{signal:life.signal})).catch(()=>{});}catch{}};
  register({
   name:'read_goodies_draft',
   description:'Read the current care-package draft and available goodie types. Does not publish or generate a recipient link.',
   inputSchema:{type:'object',properties:{},additionalProperties:false},
   annotations:{readOnlyHint:true,untrustedContentHint:true},
   execute:()=>({draft:current.current.box,catalog:catalog.map(({type,name,description})=>({type,name,description}))}),
  });
  register({
   name:'stage_goodies_draft',
   description:'Replace the visible care-package draft. Normal draft autosave runs; this does not publish or share the package.',
   inputSchema:{
    type:'object',required:['to','from','isAnonymous','template','items'],
    properties:{
     to:{type:'string',maxLength:60},from:{type:'string',maxLength:60},
     isAnonymous:{type:'boolean'},template:{type:['string','null']},
     items:{type:'array',maxItems:10,items:{
      type:'object',required:['type','note','qty','content'],
      properties:{type:{type:'string',enum:catalog.map(i=>i.type)},note:{type:'string',maxLength:500},qty:{type:'integer',minimum:1,maximum:9},content:{type:'string'}},
     }},
    },
   },
   annotations:{readOnlyHint:false,untrustedContentHint:true},
   execute:(input)=>{
    const parsed=boxSchema.safeParse(input);
    if(!parsed.success)throw Error('Invalid draft. Check names, goodie types, quantities, and content.');
    flushSync(()=>current.current.onChange(parsed.data));
    return {staged:true,goodies:parsed.data.items.reduce((n,i)=>n+i.qty,0),published:false};
   },
  });
  return()=>life.abort();
 },[]);
}
