module.exports = (req, res) => {
  const client_id = process.env.OAUTH_CLIENT_ID;
  
  if (!client_id) {
    res.status(500).send("Error: OAUTH_CLIENT_ID environment variable is not configured on Vercel.");
    return;
  }

  // Use the request host to construct the callback URL dynamically
  const redirect_uri = `https://${req.headers.host}/api/callback`;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user&redirect_uri=${redirect_uri}`;
  
  res.writeHead(302, { Location: githubAuthUrl });
  res.end();
};
