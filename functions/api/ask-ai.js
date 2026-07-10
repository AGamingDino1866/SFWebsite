const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });

const systemPrompt = `You are AI Scholar for the Success Club 2026 scholarship portal.
Help underprivileged students prepare stronger scholarship applications.
Keep answers warm, concise, practical, and student-friendly.
You can help with application preparation, essay wording, explaining financial need respectfully, academic goals, checklists, and status wording.
Do not promise approval, do not invent official decisions, and do not ask for passwords, ID numbers, bank details, or sensitive documents.
If the student needs official help, tell them to contact successscholarships2026@gmail.com.`;

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.GROQ_API_KEY) {
    return json({ ok: false, error: "AI Scholar is not configured yet. Add GROQ_API_KEY in Cloudflare Pages environment variables." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Send a valid question." }, 400);
  }

  const message = String(body.message || "").trim();
  if (!message) return json({ ok: false, error: "Ask a question first." }, 400);
  if (message.length > 1200) return json({ ok: false, error: "Please keep questions under 1200 characters." }, 400);

  const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: env.GROQ_MODEL || "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.4,
      max_completion_tokens: 550
    })
  });

  const payload = await groqResponse.json().catch(() => ({}));
  if (!groqResponse.ok) {
    return json({ ok: false, error: payload.error?.message || "Groq could not answer right now." }, 502);
  }

  const answer = payload.choices?.[0]?.message?.content?.trim();
  if (!answer) return json({ ok: false, error: "AI Scholar returned an empty answer." }, 502);

  return json({ ok: true, answer });
}
