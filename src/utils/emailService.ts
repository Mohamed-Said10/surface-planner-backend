import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

interface BookingDetails {
  propertyType: string;
  propertySize: string;
  date: string;
  timeSlot: string;
  selectedPackage: {
    name: string;
    price: number;
  };
}

export async function sendBookingConfirmationEmail(to: string, bookingDetails: BookingDetails) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // Recipient address
    subject: "Booking Confirmation",
    html: `
      <h1>Booking Confirmation</h1>
      <p>Thank you for your booking!</p>
      <p><strong>Booking Details:</strong></p>
      <ul>
        <li><strong>Property Type:</strong> ${bookingDetails.propertyType}</li>
        <li><strong>Property Size:</strong> ${bookingDetails.propertySize}</li>
        <li><strong>Date:</strong> ${bookingDetails.date}</li>
        <li><strong>Time Slot:</strong> ${bookingDetails.timeSlot}</li>
        <li><strong>Package:</strong> ${bookingDetails.selectedPackage.name}</li>
        <li><strong>Price:</strong> $${bookingDetails.selectedPackage.price}</li>
      </ul>
      <p>We look forward to serving you!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Booking confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
    throw new Error("Failed to send booking confirmation email.");
  }
}