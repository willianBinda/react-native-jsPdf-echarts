const html_pdf_model = `
    <header>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.js"></script>
    </header>

    <body>
    <script>
        const gen_output_pdf = () => {
            var doc = new jsPDF();
            doc.text("Hello world!", 10, 10);

            const pdfOutput = doc.output();

            window.ReactNativeWebView.postMessage(pdfOutput);
        };
    </script>
    </body>

    </html>
  `;

export default html_pdf_model;
