const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

const sendInvoiceEmail = async (booking, user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /* ===== CREATE PDF BUFFER ===== */

    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    doc.fontSize(20).text("OSCENOX INVOICE", { align: "center" });
    doc.moveDown();

    doc.fontSize(12)
      .text(`Customer: ${user.name}`)
      .text(`Email: ${user.email}`)
      .moveDown();

    doc.text(`Booking ID: ${booking._id}`);
    doc.text(`Property: ${booking.property}`);
    doc.text(`Room: ${booking.roomType}`);
    doc.text(`Guests: ${booking.guests}`);
    doc.text(`Check-in: ${booking.checkIn.toDateString()}`);
    doc.text(`Check-out: ${booking.checkOut.toDateString()}`);
    doc.moveDown();

    doc.fontSize(16)
      .text(`Total: ₹ ${booking.totalAmount}`, { align: "right" });

    doc.end();

    const pdfBuffer = await new Promise((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });
    });

    /* ===== SEND EMAIL ===== */

    await transporter.sendMail({
      from: `"Oscenox" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Booking Invoice - Oscenox",
      text: "Thank you for booking with Oscenox. Your invoice is attached.",
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfBuffer,
        },
      ],
    });

    console.log("Invoice email sent");
  } catch (err) {
    console.error("Email error:", err);
  }
};

module.exports = sendInvoiceEmail;
