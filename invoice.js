function generateInvoice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const date = new Date().toLocaleDateString();
    const invoiceNumber = 'INV-' + Date.now();
    
    let subtotal = 0;
    const itemsHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    }).join('');

    const shipping = 50;
    const total = subtotal + shipping;

    const invoiceHTML = `
        <div class="invoice">
            <div class="invoice-header">
                <h1>Farm2Market</h1>
                <div class="invoice-info">
                    <p>Invoice Number: ${invoiceNumber}</p>
                    <p>Date: ${date}</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Subtotal</td>
                        <td>₹${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="3">Shipping</td>
                        <td>₹${shipping.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="3"><strong>Total</strong></td>
                        <td><strong>₹${total.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;

    const style = `
        <style>
            .invoice { padding: 20px; font-family: Arial, sans-serif; }
            .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .invoice-info { text-align: right; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            tfoot td { font-weight: bold; }
            button { margin: 20px; padding: 10px 20px; background: #2b572d; color: white; border: none; border-radius: 5px; cursor: pointer; }
        </style>
    `;

    // Open a new window and write the invoice content
    const win = window.open('', '_blank');
    win.document.write(style + invoiceHTML);
    win.document.close();

    // Inject the html2pdf library into the new window
    const html2pdfScript = win.document.createElement('script');
    html2pdfScript.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    win.document.head.appendChild(html2pdfScript);

    // Create a download button in the new window
    const downloadBtn = win.document.createElement('button');
    downloadBtn.innerHTML = 'Download Invoice as PDF';

    // Set up the click event to convert the invoice to PDF and trigger download
    downloadBtn.onclick = () => {
        // Make sure the html2pdf library is loaded
        if (typeof win.html2pdf === 'undefined') {
            alert('PDF generator is not ready. Please try again in a moment.');
            return;
        }
        const invoiceElement = win.document.querySelector('.invoice');
        const opt = {
            margin:       0.5,
            filename:     `invoice-${invoiceNumber}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        win.html2pdf().set(opt).from(invoiceElement).save();
    };

    // Append the download button to the new window's body
    win.document.body.appendChild(downloadBtn);
}
