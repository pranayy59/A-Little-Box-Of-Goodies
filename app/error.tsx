'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="center-page"><h1>A little delivery hiccup.</h1><p>Your saved box is still worth coming back for.</p><button className="primary" onClick={reset}>Try again</button></main>;}
