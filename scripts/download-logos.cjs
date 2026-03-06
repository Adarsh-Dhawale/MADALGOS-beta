const fs = require("fs");
const path = require("path");
const https = require("https");

const logos = [
  { name: "microsoft", domain: "microsoft.com" },
  { name: "amazon", domain: "amazon.com" },
  { name: "samsung", domain: "samsung.com" },
  { name: "jpmorgan", domain: "jpmorganchase.com" },
  { name: "walmart", domain: "walmart.com" },
  { name: "capgemini", domain: "capgemini.com" },
  { name: "tcs", domain: "tcs.com" },
  { name: "google", domain: "google.com" },
];

const publicDir = path.join(__dirname, "..", "public");
const logosDir = path.join(publicDir, "logos");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

function downloadLogo({ name, domain }) {
  return new Promise((resolve, reject) => {
    const url = `https://logo.clearbit.com/${domain}`;
    const filePath = path.join(logosDir, `${name}.png`);

    console.log(`Downloading ${name} logo from ${url} -> ${filePath}`);

    const file = fs.createWriteStream(filePath);
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(filePath, () => {});
          return reject(
            new Error(`Failed to download ${name}: status ${res.statusCode}`)
          );
        }

        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        file.close();
        fs.unlink(filePath, () => {});
        reject(err);
      });
  });
}

async function run() {
  for (const logo of logos) {
    try {
      await downloadLogo(logo);
    } catch (err) {
      console.error(`Error downloading ${logo.name}:`, err.message);
    }
  }
  console.log("Done downloading logos.");
}

run();

