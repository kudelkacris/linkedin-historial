const KEY = 'mailSentMap';

export async function onRequestGet(context) {
  const raw = await context.env.MAIL_KV.get(KEY);
  return new Response(raw || '{}', {
    headers: { 'content-type': 'application/json' }
  });
}

export async function onRequestPost(context) {
  const body = await context.request.json();
  const raw = await context.env.MAIL_KV.get(KEY);
  const map = raw ? JSON.parse(raw) : {};

  if (body.checked) map[body.id] = true;
  else delete map[body.id];

  await context.env.MAIL_KV.put(KEY, JSON.stringify(map));
  return new Response(JSON.stringify(map), {
    headers: { 'content-type': 'application/json' }
  });
}
