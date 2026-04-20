export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    },
    maxDuration: 30
  }
};

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end();
  try {
    const body = {...req.body, max_tokens: 4000};
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({error:{message:e.message}});
  }
}
