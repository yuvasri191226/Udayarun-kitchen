/**
 * Probe Unsplash photo IDs, then download the ones that return HTTP 200 as small
 * thumbnails into tmp-img/ so each candidate can be visually verified before it
 * is written into data/dishes.ts.
 *
 * Usage:  node scripts/fetch-candidates.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const CANDIDATES = [
  // South Indian breakfast / dosai / everyday
  "1630383249896-424e482df921",
  "1631515243349-e0cb75fb8d3a",
  "1642821373181-696a7d5a3f2c",
  "1626135395660-156c4a1b8f45",
  "1596040033229-a9821ebd058d",
  "1505253758473-96b7015fcd40",
  "1606491956689-2ea866880c84",
  "1585032226651-759b368d7246",
  "1546069901-ba9599a7e63c",
  "1540189549336-e6e99c3679fe",
  "1476224203421-9ac39bcb3327",
  // Curries / paneer / veg mains
  "1585937421612-70a008356fbe",
  "1631292784640-2b24be784d5d",
  "1512058564366-18510be2db19",
  "1574658853498-b78601c3ca78",
  "1588168333986-5078d3ae3976",
  "1601050690597-df0568f70950",
  "1596797038530-2c107229654b",
  "1631452180519-c014fe946bc7",
  "1567188040759-fb8a883dc6d8",
  "1626804475297-41608ea09aeb",
  // Biryani / rice
  "1633945274405-b6c8069047b0",
  "1589302168068-964664d93dc0",
  "1563379091339-03b21ab4a4f8",
  "1589301760014-d929f3979dbc",
  "1668236543090-82eba5ee5976",
  // Chicken / mutton specials
  "1603894584373-5ac82b2ae398",
  "1544025162-d76694265947",
  "1602470520998-f4a52199a3d6",
  "1603360946369-dc9bb6258143",
  "1514516345957-556ca7d90a29",
  "1432139555190-58524dae6a55",
  // Coastal catch
  "1565557623262-b51c2513a641",
  "1534422298391-e4f8c172dddb",
  "1626777552726-4a6b54c97e46",
  "1546833999-b9f581a1996d",
  // Desserts
  "1601303511543-8d5f1c8ba1e4",
  "1529042410759-befb1204b468",
  "1587049352846-4a222e784d38",
  "1621303837174-89787a7d4729",
  "1565958011703-44f9829ba187",
  "1488477181946-6428a0291777",
  "1470124182917-cc6e71b22ecc",
  "1563805042-7684c019e1cb",
  "1551024506-0bccd828d307",
  "1519676867240-f03562e64548",
  "1578985545062-69928b1d9587",
  "1582716401301-b2407dc7563d",
  "1499636136210-6f4ee915583e",
  "1519915028121-7d3463d20b13",
  "1579954115545-a95591f28bfc",
  "1571877227200-a0d98ea607e9",
  "1563245372-f21724e3856d",
];

const OUT_DIR = path.join(__dirname, "..", "tmp-img");
const FULL = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800`;
const THUMB = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=70&w=190`;

function get(url, asBuffer) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 25000 }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return resolve({ code: res.statusCode });
      }
      if (!asBuffer) {
        res.resume();
        return resolve({ code: 200 });
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ code: 200, body: Buffer.concat(chunks) }));
    });
    req.on("error", (e) => resolve({ code: `ERR ${e.message}` }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ code: "TIMEOUT" });
    });
  });
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const ok = [];
  const bad = [];

  for (const id of CANDIDATES) {
    const head = await get(FULL(id), false);
    if (head.code !== 200) {
      bad.push(`${head.code}  ${id}`);
      continue;
    }
    const img = await get(THUMB(id), true);
    if (img.code === 200) {
      fs.writeFileSync(path.join(OUT_DIR, `${id}.jpg`), img.body);
      ok.push(id);
    } else {
      bad.push(`${img.code}  ${id} (thumb)`);
    }
  }

  const report = [
    `OK (${ok.length}):`,
    ...ok.map((id) => `  ${id}`),
    "",
    `NOT USABLE (${bad.length}):`,
    ...bad.map((b) => `  ${b}`),
  ].join("\n");

  fs.writeFileSync(path.join(__dirname, "..", "candidates.txt"), report + "\n");
  process.stdout.write(report + "\n");
})();