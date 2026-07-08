const https = require('https');

module.exports = (req, res) => {
  const code = req.query.code;
  const client_id = process.env.OAUTH_CLIENT_ID;
  const client_secret = process.env.OAUTH_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    res.status(500).send("Error: OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET environment variable is not configured on Vercel.");
    return;
  }

  if (!code) {
    res.status(400).send("Error: Missing code parameter from GitHub OAuth callback.");
    return;
  }

  const redirect_uri = `https://${req.headers.host}/api/callback`;
  const data = JSON.stringify({
    client_id,
    client_secret,
    code,
    redirect_uri
  });

  const options = {
    hostname: 'github.com',
    port: 443,
    path: '/login/oauth/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': data.length,
      'User-Agent': 'Decap-CMS-OAuth-Vercel'
    }
  };

  const postReq = https.request(options, (postRes) => {
    let body = '';
    postRes.on('data', (chunk) => {
      body += chunk;
    });

    postRes.on('end', () => {
      try {
        const response = JSON.parse(body);
        if (response.access_token) {
          const token = response.access_token;
          const content = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Authorizing...</title>
            </head>
            <body>
              <p>Authorization successful! Redirecting back to Decap CMS...</p>
              <script>
                (function() {
                  function recieveMessage(e) {
                    window.opener.postMessage(
                      'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
                      e.origin
                    );
                  }
                  window.addEventListener("message", recieveMessage, false);
                  // Request origin from opener
                  window.opener.postMessage("authorizing:github", "*");
                })()
              </script>
            </body>
            </html>
          `;
          res.setHeader('Content-Type', 'text/html');
          res.status(200).send(content);
        } else {
          res.status(400).send(`Error obtaining access token from GitHub: ${body}`);
        }
      } catch (err) {
        res.status(500).send(`Error parsing GitHub token response: ${err.message}`);
      }
    });
  });

  postReq.on('error', (e) => {
    res.status(500).send(`Request error: ${e.message}`);
  });

  postReq.write(data);
  postReq.end();
};
