'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState('https://google.com');
  const [siteInfo, setSiteInfo] = useState({});

  const handleUrlChange = (event: any) => {
    if (!loading) {
      setUrl(event.target.value);
    }
  };

  const handleSubmit = async (event: any) => {
    setLoading(true);
    setSiteInfo({
      loading
    })
    event.preventDefault();

    const res = await fetch('/api/site-info', {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setSiteInfo(data);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-sky-400 text-2xl mb-8">Get site info with Puppeteer and Chromium</h1>
      <div className="w-[400px]">
        <form
          className="flex flex-col w-full mb-4"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="url"
            className="flex flex-col mb-4 text-neutral-400"
          >
            <span className="mb-1">URL (must include protocol)</span>
            <input
              type="text"
              id="url"
              name="url"
              className="rounded-md p-2 text-black"
              value={url}
              onChange={handleUrlChange}
            ></input>
          </label>
          <button
            type="submit"
            className="rounded-md text-neutral-100 bg-sky-400 disabled:bg-sky-400/50 p-2 h-12"
            disabled={loading}
          >
            { loading ? <svg className='computer mx-auto animate-spin' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path></svg> : <span className="uppercase">Submit</span> }
          </button>
        </form>
        <pre className="w-full bg-neutral-900 p-3 rounded-md transition-all">{JSON.stringify(siteInfo, null, 2)}</pre>
      </div>
    </main>
  );
}
