module.exports = (req, res) => {
    const clientId = process.env.OAUTH_CLIENT_ID;
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const redirectUri = `https://${host}/api/callback`;
    const state = Math.random().toString(36).slice(2);

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user&state=${state}`;
    res.writeHead(302, { Location: url });
    res.end();
};
