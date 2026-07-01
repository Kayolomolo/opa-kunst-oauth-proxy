module.exports = (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(`
        <!doctype html>
        <html lang="nl">
        <head>
            <meta charset="UTF-8">
            <title>Inloggen</title>
            <style>
                body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f5f3ef; }
                form { background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 280px; }
                h1 { font-size: 1.2em; margin-top: 0; }
                label { display: block; margin-top: 14px; font-size: 0.9em; color: #333; }
                input { width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
                button { margin-top: 20px; width: 100%; padding: 10px; background: #3a3a3a; color: #fff; border: none; border-radius: 4px; font-size: 1em; cursor: pointer; }
                button:hover { background: #555; }
                #foutmelding { color: #b00020; font-size: 0.9em; margin-top: 12px; display: none; }
            </style>
        </head>
        <body>
            <form id="inlogformulier">
                <h1>Inloggen</h1>
                <label>E-mailadres<input type="email" id="email" required></label>
                <label>Wachtwoord<input type="password" id="wachtwoord" required></label>
                <button type="submit">Inloggen</button>
                <p id="foutmelding">Onjuist e-mailadres of wachtwoord.</p>
            </form>
            <script>
                let appOrigin = "*";
                window.addEventListener("message", (e) => { appOrigin = e.origin; });
                if (window.opener) window.opener.postMessage("authorizing:github", "*");

                document.getElementById("inlogformulier").addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const email = document.getElementById("email").value;
                    const wachtwoord = document.getElementById("wachtwoord").value;
                    const foutmelding = document.getElementById("foutmelding");
                    foutmelding.style.display = "none";

                    const res = await fetch("/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, wachtwoord })
                    });
                    const data = await res.json();

                    if (data.token) {
                        const payload = JSON.stringify({ token: data.token, provider: "github" });
                        window.opener.postMessage("authorization:github:success:" + payload, appOrigin);
                    } else {
                        foutmelding.style.display = "block";
                    }
                });
            </script>
        </body>
        </html>
    `);
};
