# OAuth-proxy voor de beheerpagina van de kunst-website

Dit kleine project zorgt ervoor dat de beheerpagina (`/admin/`) van
[opa-kunst-website](https://github.com/Kayolomolo/opa-kunst-website) kan
inloggen met een GitHub-account. Het draait gratis op Vercel.

## Eenmalige installatie

1. **Maak een GitHub OAuth App aan:**
   Ga naar https://github.com/settings/applications/new en vul in:
   - Application name: `Opa kunst beheer`
   - Homepage URL: `https://kayolomolo.github.io/opa-kunst-website/`
   - Authorization callback URL: `https://JOUW-VERCEL-ADRES.vercel.app/api/callback`
     (dit adres weet je pas na stap 2 — kom hier even op terug)

   Na het aanmaken krijg je een **Client ID** en kun je een **Client secret** genereren. Bewaar beide.

2. **Deploy dit project op Vercel:**
   - Ga naar https://vercel.com, maak een gratis account (geen creditcard nodig), en kies **Add New → Project**.
   - Importeer deze repo (`opa-kunst-oauth-proxy`).
   - Voeg twee Environment Variables toe:
     - `OAUTH_CLIENT_ID` = de Client ID van stap 1
     - `OAUTH_CLIENT_SECRET` = het Client secret van stap 1
   - Klik op **Deploy**. Je krijgt een adres zoals `https://opa-kunst-oauth-proxy.vercel.app`.

3. **Rond de GitHub OAuth App af:**
   Ga terug naar de OAuth App instellingen (stap 1) en vul de echte callback URL in:
   `https://opa-kunst-oauth-proxy.vercel.app/api/callback`

4. **Koppel het adres aan de beheerpagina:**
   Geef het Vercel-adres door, dan werk ik `admin/config.yml` in de website-repo bij met `base_url: https://opa-kunst-oauth-proxy.vercel.app`.

Daarna kan iedereen met schrijftoegang tot de repo (zoals jij) inloggen op
`https://kayolomolo.github.io/opa-kunst-website/admin/` met hun GitHub-account.
