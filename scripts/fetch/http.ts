// Small polite HTTP helper shared by all fetchers.
export const USER_AGENT =
  'TimeLiner-data-bot/0.1 (unofficial static timeline project; https://github.com/ShreyasKashyap357/TimeLiner)';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getJson<T = unknown>(url: string, retries = 3): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' } });
    if (res.ok) return (await res.json()) as T;
    if (attempt >= retries || (res.status < 500 && res.status !== 429)) {
      throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
    }
    await sleep(1000 * 2 ** attempt);
  }
}

export async function politePause(ms = 1500) {
  await sleep(ms);
}
