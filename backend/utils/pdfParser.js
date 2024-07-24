const PDFExtract = require('pdf.js-extract').PDFExtract;
export default function parsePDF(){
    const pdfExtract = new PDFExtract();
    const options = {}; /* see below */
    let string = '';
    pdfExtract.extract('coverletter.pdf', options, (err, data) => {
      if (err) return err;
      const strObj = data.pages[0]['content']
      for( let obj of strObj){
          string += obj['str']
        }
    })
    return string
}
