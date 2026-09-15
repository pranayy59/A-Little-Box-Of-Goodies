import {existsSync,mkdirSync,closeSync,openSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
const url=process.env.DATABASE_URL||'file:./goodies.db';
if(url.startsWith('file:')){const path=resolve('prisma',url.slice(5));mkdirSync(dirname(path),{recursive:true});if(!existsSync(path))closeSync(openSync(path,'a'));}
