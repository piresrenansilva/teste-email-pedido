const fs = require("fs").promises;
const path = require("path");
const Handlebars = require("handlebars");

module.exports = async function gerarPDF(dados, browser) {
    const templatePath = path.join(__dirname, "../templates/pedido.hbs");
    const cssPath = path.join(__dirname, "../styles/pedido.css");

    const templateHtml = await fs.readFile(templatePath, "utf8");
    const css = await fs.readFile(cssPath, "utf8");

    const template = Handlebars.compile(templateHtml);
    
    const html = template({dados, css});

    const page = await browser.newPage();
	
	page.setDefaultTimeout(90000);

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({        
        format: "A4",
        printBackground: true
    });

    await page.close();

    return pdf;
};