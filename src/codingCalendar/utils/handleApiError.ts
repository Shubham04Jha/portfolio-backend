import nodemailer from "nodemailer";

interface ErrorHandlerOptions {
    serviceName: string;  // "LeetCode", "GitHub"
    error: unknown;
}

export async function handleApiError({ serviceName, error }: ErrorHandlerOptions) {
    console.error(`Error in ${serviceName} API:\n\n`, error);
    const recipient = process.env.RECIPIENT_EMAIL;
    const sender = process.env.SENDER_EMAIL;
    const password = process.env.NodeMailer_APP_Password;
    if (!recipient || !sender || !password) {
        console.warn("NodeMailer env variables not set, skipping email notification.");
        return;
    }
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: sender, pass: password },
        });

        const mailOptions = {
            from: sender,
            to: recipient,
            subject: `API Failure: ${serviceName}`,
            text: `An error occurred while fetching data from the ${serviceName} API:\n\n\n\n${error}`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent for ${serviceName} API failure.`);
    } catch (mailError) {
        console.error("Failed to send error email:", mailError);
    }
}
