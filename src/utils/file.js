const fs = require("fs").promises;
const path = require("path");

async function toBase64(caminho) {
    if (!caminho) return null;

    let caminhoLimpo = caminho.replace("file:///", "");

    caminhoLimpo = path.resolve(caminhoLimpo);

    const caminhoPadrao = path.resolve(__dirname, '../assets/semfoto.jpg');

    let buffer;

    try {
        buffer = await fs.readFile(caminhoLimpo);
    } catch {
        buffer = await fs.readFile(caminhoPadrao);
    }

    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

module.exports = {
    toBase64
};