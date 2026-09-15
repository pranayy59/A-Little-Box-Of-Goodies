import { PrismaClient } from '@prisma/client';
import { createHash, randomBytes } from 'node:crypto';
const db = new PrismaClient();
await db.package.upsert({where:{id:'a-little-demo'},update:{},create:{id:'a-little-demo',senderHash:createHash('sha256').update(randomBytes(32)).digest('hex'),to:'You',from:'A friend',status:'sent',template:'Rough Day',items:JSON.stringify([{type:'candy',qty:2,note:'A little sweetness for a not-so-sweet day.',content:''},{type:'song',qty:1,note:'Let this one keep you company.',content:'https://www.youtube.com/watch?v=HgzGwKwLmgM'},{type:'quote',qty:1,note:'You don’t have to have it all figured out today.',content:'Small steps still move you forward.'},{type:'hug',qty:1,note:'The really long kind. Stay here as long as you need.',content:''}])}});
await db.$disconnect();
console.log('Demo ready at /p/a-little-demo');
