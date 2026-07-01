# Inlogdienst voor de beheerpagina van de kunst-website

Dit kleine project zorgt ervoor dat de beheerpagina (`/admin/`) van
[opa-kunst-website](https://github.com/Kayolomolo/opa-kunst-website) een
eigen inlogscherm heeft (e-mailadres + wachtwoord), zonder dat er een
GitHub-account nodig is om in te loggen. Het draait gratis op Vercel.

Achter de schermen gebruikt de dienst één technische sleutel (een GitHub
Personal Access Token) om de wijzigingen daadwerkelijk op te slaan — dat is
onzichtbaar voor de gebruiker.

## Eenmalige installatie

1. **Maak een GitHub Personal Access Token aan:**
   Ga naar https://github.com/settings/tokens?type=beta → **Generate new token**.
   - Repository access: **Only select repositories** → kies `opa-kunst-website`
   - Permissions → **Contents**: zet op **Read and write**
   - Klik op **Generate token** en bewaar de token direct (begint met `github_pat_...`) — hij wordt maar één keer getoond.

2. **Zet de Environment Variables in Vercel:**
   Ga naar het project `opa-kunst-oauth-proxy` op vercel.com → **Settings → Environment Variables** en voeg toe:
   - `GITHUB_TOKEN` = de token van stap 1
   - `ADMIN_EMAIL` = het e-mailadres waarmee ingelogd mag worden (zelf te kiezen)
   - `ADMIN_PASSWORD` = het wachtwoord waarmee ingelogd mag worden (zelf te kiezen)

   (De oude `OAUTH_CLIENT_ID` / `OAUTH_CLIENT_SECRET` variabelen zijn niet meer nodig en mogen verwijderd worden.)

3. **Deploy opnieuw:**
   Ga naar **Deployments**, klik bij de bovenste deployment op **... → Redeploy**.

Daarna kan iedereen met dat e-mailadres en wachtwoord inloggen op
`https://kayolomolo.github.io/opa-kunst-website/admin/` — geen GitHub-kennis nodig.
