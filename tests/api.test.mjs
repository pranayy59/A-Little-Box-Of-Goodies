import test from 'node:test';
import assert from 'node:assert/strict';
import {PrismaClient} from '@prisma/client';
const origin=process.env.TEST_URL||'http://localhost:3000';
const db=new PrismaClient();
test('package creation rejects malformed JSON and invalid schemas',async()=>{
 const post=body=>fetch(`${origin}/api/packages`,{method:'POST',headers:{'Content-Type':'application/json'},body});
 let r=await post('{');assert.equal(r.status,400);
 assert.deepEqual(await r.json(),{error:'Could not save your box. Please try again.'});
 r=await post('{}');assert.equal(r.status,400);
 assert.deepEqual(await r.json(),{error:'Please check your names and goodies.'});
});
test('private draft → anonymous delivery → opening → reaction → edit lock',async()=>{
 const box={to:'API test recipient',from:'PRIVATE_SENDER_MUST_NOT_LEAK',isAnonymous:true,template:'Just Because',items:[{type:'quote',qty:1,note:'Made with care',content:'One small step.'}]};let id;
 try {
  let r=await fetch(`${origin}/api/packages`,{method:'POST',body:JSON.stringify(box)});assert.equal(r.status,201);const saved=await r.json();id=saved.id;const headers={'Content-Type':'application/json','x-sender-token':saved.token};
  assert.equal((await fetch(`${origin}/p/${id}`)).status,404);
  assert.equal((await fetch(`${origin}/p/${id}/og`)).status,404);
  assert.equal((await fetch(`${origin}/api/packages/${id}`)).status,404);
  r=await fetch(`${origin}/api/packages/${id}`,{headers});let data=await r.json();assert.equal(data.openedAt,null);assert.equal(data.from,box.from);assert.equal(data.senderHash,undefined);
  assert.equal((await fetch(`${origin}/api/packages/${id}`,{method:'PATCH',headers,body:JSON.stringify({...box,items:[],publish:true})})).status,400);
  r=await fetch(`${origin}/api/packages/${id}`,{method:'PATCH',headers,body:JSON.stringify({...box,publish:true})});assert.equal(r.status,200);
  r=await fetch(`${origin}/p/${id}`);assert.equal(r.status,200);const html=await r.text();assert.ok(html.includes('A secret admirer'));assert.ok(!html.includes(box.from));assert.ok(html.includes(`/p/${id}/og`));
  r=await fetch(`${origin}/p/${id}/og`);assert.equal(r.status,200);assert.ok(r.headers.get('content-type').startsWith('image/'));
  data=await (await fetch(`${origin}/api/packages/${id}`,{headers})).json();assert.equal(data.openedAt,null,'page views and OG fetches must not mark opened');
  r=await fetch(`${origin}/api/packages/${id}/open`,{method:'POST'});assert.equal(r.status,200);assert.equal((await r.json()).canReact,true);const cookie=r.headers.get('set-cookie').split(';')[0];
  data=await (await fetch(`${origin}/api/packages/${id}`,{headers})).json();assert.ok(data.openedAt);
  r=await fetch(`${origin}/api/packages/${id}/open`,{method:'POST'});assert.equal((await r.json()).canReact,false);
  assert.equal((await fetch(`${origin}/api/packages/${id}/reaction`,{method:'POST',body:JSON.stringify({reaction:'❤️',note:'thank you'})})).status,403);
  assert.equal((await fetch(`${origin}/api/packages/${id}/reaction`,{method:'POST',headers:{cookie},body:JSON.stringify({reaction:'🥹',note:'You made my day'})})).status,200);
  data=await (await fetch(`${origin}/api/packages/${id}`,{headers})).json();assert.equal(data.recipientReaction,'🥹');assert.equal(data.recipientNote,'You made my day');
  const afterReply=await (await fetch(`${origin}/p/${id}`)).text();assert.ok(!afterReply.includes('You made my day'),'thank-you notes are private to the sender');
  assert.equal((await fetch(`${origin}/api/packages/${id}`,{method:'PATCH',headers,body:JSON.stringify({...box,to:'Changed'})})).status,409);
  assert.equal((await fetch(`${origin}/api/packages`,{method:'POST',body:JSON.stringify({...box,items:[{type:'photo',note:'',qty:1,content:'data:image/svg+xml;base64,abc='}]})})).status,400);
 }finally{if(id)await db.package.delete({where:{id}});await db.$disconnect();}
});
