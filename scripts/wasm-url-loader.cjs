const { copyFileSync, mkdirSync, readFileSync } = require("fs");
const path = require("path");

module.exports = async function wasmUrlLoader() {
  const source = readFileSync(this.resourcePath);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", source);
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 12);
  const fileName = `dotlottie-player.${hash}.wasm`;

  const outputDir = path.join(process.cwd(), "public", "wasm");
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(this.resourcePath, path.join(outputDir, fileName));

  return `export default "/wasm/${fileName}";`;
};
