/**
 * Audit every Unsplash image URL in data/dishes.ts (plus candidate replacements)
 * and report which ones actually return HTTP 200.
 *
 * Usage:  node scripts/audit-images.js  > image-audit.txt
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const CANDIDATES = [
  // ---- requested (must verify) ----
  "1668236543090-82eba5ee5976", // Classic Podi Dosa
  "1589301760014-d929f3979dbc", // Madurai Kari Dosa
  "1630409351241-e902d33451e1", // Paneer Pepper Roast  (was 404)
  "1563379091339-03b21ab4a4f8", // Nadan Chicken Biryani (the fix)
  "1633945274405-b6c8069047b0", // Dindigul Thalappakatti Mutton Biryani
  "1589302168068-964664d93dc0", // Gongura Chicken Biryani
  "1603894584373-5ac82b2ae398", // Kozhi Varutharachathu
  "1545247389-130f1469e5d0", // Mutton Sukka Varuval (was 404)
  "1565557623262-b51c2513a641", // Coconut Prawn Curry
  "1534422298391-e4f8c172dddb", // Meen Pollichathu
  // ---- existing catalog ----
  "1541519227354-08fa5d50c46d", // Mango Avocado Toast (was 404)
  "1473093295043-cdd812d0e601",
  "1567188040759-fb8a883dc6d8",
  "1552332386-f8dd00dc2f85",
  "1626804475297-41608ea09aeb",
  "1569718212165-3a8278d5f624",
  "1571877227200-a0d98ea607e9",
  "1574071318508-1cdbab80d002",
  "1519915028121-7d3463d20b13",
  "1579954115545-a95591f28bfc",
  "1578985545062-69928b1d9587",
  "1582716401301-b2407dc7563d",
  "1499636136210-6f4ee915583e",
  "1563245372-f21724e3856d",
  // ---- spare candidates for the 404 slots ----
  "1525351484163-7529414344d8",
  "1603046891726-36bfd957e0bf",
  "1482049016688-2d3e1b311543",
  "1508737027454-e6454ef45afd",
  "1601050690597-df0568f70950",
  "1631452180519-c014fe946bc7",
  "1596797038530-2c107229654b",
  "1603360946369-dc9bb6258143",
  "1544025162-d76694265947",
  "1602470520998-f4a52199a3d6",
  "1514516345957-556ca7d90a29",
  "1432139555190-58524dae6a55",
  "1546833999-b9f581a1996d",
  "1626777552726-4a6b54c97e46",
];

function probe(id) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800`;
  return new Promise((resolve) => {
    const req = https.request(url, { method: "HEAD", timeout: 20000 }, (res) => {
      res.resume();
      resolve({ id, code: res.statusCode });
    });
    req.on("error", (e) => resolve({ id, code: `ERR ${e.message}` }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ id, code: "TIMEOUT" });
    });
    req.end();
  });
}

(async () => {
  const lines = [];
  // Keep the catalog scan so any future URL regression is caught too.
  const dishesPath = path.join(__dirname, "..", "data", "dishes.ts");
  const src = fs.readFileSync(dishesPath, "utf8");
  const inCatalog = [
    ...new Set([...src.matchAll(/photo-([0-9a-f-]+)\?/g)].map((m) => m[1])),
  ];
  const ids = [...new Set([...inCatalog, ...CANDIDATES])];

  for (const id of ids) {
    const { code } = await probe(id);
    const tag = code === 200 ? "OK    " : "BROKEN";
    const where = inCatalog.includes(id) ? "[catalog] " : "[candidate]";
    lines.push(`${tag} ${String(code).padEnd(6)} ${where}${id}`);
  }

  const brokenInCatalog = lines.filter(
    (l) => l.startsWith("BROKEN") && l.includes("[catalog]")
  );
  lines.push("");
  lines.push(`checked=${ids.length}  brokenInCatalog=${brokenInCatalog.length}`);
  const out = lines.join("\n");
  fs.writeFileSync(path.join(__dirname, "..", "image-audit.txt"), out + "\n");
  process.stdout.write(out + "\n");
})();
