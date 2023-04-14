const feedCandidates = ['rss.xml', 'feed.xml', 'atom.xml', 'feed.rss', 'feed.atom'];

const delay = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function validateUrl(url: string): Promise<boolean> {
  const result = await fetch(url, { method: 'HEAD', cache: 'no-store' });

  return result.status === 200 || false;
}

export async function POST(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (const candidate of feedCandidates) {
        const url = `https://turbo.build/${candidate}`;
        controller.enqueue(encoder.encode(`Looking up ${url}...`));

        const result = (await validateUrl(url as string)) ? 'OK' : 'FAIL';
        controller.enqueue(encoder.encode(`Looking up ${url}... (${result})`));
      }

      controller.close();
    },
  });

  return new Response(stream);
}
