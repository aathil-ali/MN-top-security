import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function POST(req, res) {
    try {
        const { name, date } = await req.json();

        if (!name || !date) {
            return NextResponse.json(
                { message: "Name and date are required" },
                { status: 400 }
            );
        }

        // Load the existing PDF template
        const templatePath = path.resolve(
            "./public/certificate/security-template.pdf"
        );
        const existingPdfBytes = fs.readFileSync(templatePath);

        // Create a new PDF document
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Get the first page of the document
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        // Embed fonts
        const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        // Define the font size and color
        const nameFontSize = 28; // Adjusted to match the bold style
        const dateFontSize = 13; // Smaller size for the date

        // Define the positions for the name and date (adjust based on your template)
        const nameX = 340;
        const nameY = 235;
        const dateX = 450;
        const dateY = 327;
        const color = rgb(0, 0, 0);
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date(date));

        // Draw text on the certificate
        firstPage.drawText(name, { x: nameX, y: nameY, size: nameFontSize, font: fontHelveticaBold, color });
        firstPage.drawText(formattedDate, { x: dateX, y: dateY, size: dateFontSize, font: fontHelvetica, color });

        // Serialize the PDF document to bytes (Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // Generate a unique filename for the PDF file
        const fileName = `certificate_${Date.now()}.pdf`;
        const filePath = path.join(process.cwd(), "public", "certificates", fileName);

        // Ensure the directory exists, create it if necessary
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Write the PDF file to the public directory
        fs.writeFileSync(filePath, pdfBytes);

        // Construct the URL for the public file
        const fileUrl = `/certificates/${fileName}`;

        // Return the URL to the client
        return NextResponse.json({ fileUrl });
    } catch (error) {
        console.error("Error generating certificate:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}