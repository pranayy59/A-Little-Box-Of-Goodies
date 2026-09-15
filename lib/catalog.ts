export const catalog = [
 {type:'candy',name:'A little candy',description:'A sweet little pick-me-up',icon:'Candy',color:'pink',defaultContent:''},
 {type:'song',name:'A song for you',description:'Say it with a favorite song',icon:'Music2',color:'blue',defaultContent:''},
 {type:'quote',name:'Words to keep',description:'A few words, a little light',icon:'Quote',color:'yellow',defaultContent:'Small steps still move you forward.'},
 {type:'playlist',name:'A whole mood',description:'A playlist to keep them company',icon:'Disc3',color:'purple',defaultContent:''},
 {type:'game',name:'A tiny distraction',description:'A pocket-sized matching game',icon:'Gamepad2',color:'green',defaultContent:''},
 {type:'photo',name:'A happy memory',description:'A photo worth smiling about',icon:'Image',color:'peach',defaultContent:''},
 {type:'voice',name:'Your voice',description:'Sometimes, a voice is a hug',icon:'Mic',color:'yellow',defaultContent:''},
 {type:'doodle',name:'A little doodle',description:'Draw something just for them',icon:'Pencil',color:'pink',defaultContent:''},
 {type:'hug',name:'A big, warm hug',description:'No words needed. Just this.',icon:'HeartHandshake',color:'peach',defaultContent:''},
 {type:'tea',name:'A moment of calm',description:'A tiny invitation to slow down',icon:'CupSoda',color:'green',defaultContent:''},
] as const;
export type ItemType = typeof catalog[number]['type'];
export type Goodie = {type:ItemType;note:string;qty:number;content:string};
export type Box = {to:string;from:string;isAnonymous:boolean;items:Goodie[];template:string|null};
export type PackageView = Box & {id:string;createdAt:string;openedAt:string|null;recipientReaction:string|null;recipientNote:string|null;status:string};
export type Saved = {id:string;token:string};
export const emptyBox:Box = {to:'',from:'',isAnonymous:false,items:[],template:null};
export const templates = [
 {name:'Rough Day',emoji:'💛',types:['candy','quote','hug'],note:'A small reminder: you’re doing better than you think.'},
 {name:'Congrats!',emoji:'🎉',types:['candy','song','doodle'],note:'Look at you go! I’m so proud of you.'},
 {name:'Missing You',emoji:'🤍',types:['photo','voice','hug'],note:'Wish I could hand you this in person.'},
 {name:'Just Because',emoji:'✨',types:['tea','game','quote'],note:'No occasion. Just wanted to make you smile.'},
] as const;
