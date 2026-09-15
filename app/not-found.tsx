import Link from 'next/link';
import {PackageOpen} from 'lucide-react';
export default function NotFound(){return <main className="center-page"><PackageOpen size={76} strokeWidth={1}/><span className="eyebrow">A LITTLE LOST IN THE POST</span><h1>This box took a wrong turn.</h1><p>This package link doesn’t exist (or was typed wrong).</p><Link className="primary" href="/">Make your own box of goodies →</Link></main>;}
