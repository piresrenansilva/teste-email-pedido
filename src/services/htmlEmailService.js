const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");

module.exports = async function gerarCorpoEmail(dados) {
    const templatePath = path.join(__dirname, "../templates/mensagem.hbs");
    const templateHtml = fs.readFileSync(templatePath, "utf8");

    const template = Handlebars.compile(templateHtml);
        
    const html = template({dados});

    return html;
}