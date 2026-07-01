const crypto = require("crypto");

function veiligGelijk(a, b) {
    const bufA = Buffer.from(String(a));
    const bufB = Buffer.from(String(b));
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}

module.exports = (req, res) => {
    const { email, wachtwoord } = req.body || {};

    const juisteEmail = process.env.ADMIN_EMAIL || "";
    const juisteWachtwoord = process.env.ADMIN_PASSWORD || "";

    const klopt =
        email && wachtwoord &&
        veiligGelijk(email.toLowerCase().trim(), juisteEmail.toLowerCase().trim()) &&
        veiligGelijk(wachtwoord, juisteWachtwoord);

    if (klopt) {
        res.json({ token: process.env.GITHUB_TOKEN });
    } else {
        res.status(401).json({ error: "Ongeldige inloggegevens" });
    }
};
