const PDFExtract = require("pdf.js-extract").PDFExtract;
const fs = require("fs");

async function parsePDF(buffer) {
  const pdfExtract = new PDFExtract();
  const options = {}; /* see below */

  const testing1 = pdfExtract
    .extractBuffer(buffer)
    .then((data) => {
      let textStr = "";
      for (let page of data.pages) {
        for (let text of page.content) {
          textStr += text.str;
        }
      }
      return textStr;
    })
    .catch((e) => e);

  return testing1;
}

module.exports = {
  parsePDF,
};
