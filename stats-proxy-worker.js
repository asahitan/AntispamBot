export default {
  async fetch(request) {
    // Relays the request to your Katabump-hosted bot over plain HTTP,
    // and returns it to the browser over HTTPS with CORS allowed.
    // If your Katabump IP or port ever changes, update the line below.
    const target = "http://51.75.118.151:20060/api/stats";

    try {
      const res = await fetch(target, { cf: { cacheTtl: 0 } });
      const body = await res.text();
      return new Response(body, {
        status: res.status,
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*",
          "cache-control": "no-store",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "bot unreachable" }), {
        status: 502,
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*",
        },
      });
    }
  },
};
