import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex items-center justify-center antialiased min-h-screen">
      <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-md space-y-6">
        <h1 className="font-bold text-3xl text-black">Projects</h1>
        <div>
          <ul>
            <li className="py-2 px-3 rounded-md hover:bg-slate-50 hover:text-black cursor-pointer">
              <Link href="/circle">Circle</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
