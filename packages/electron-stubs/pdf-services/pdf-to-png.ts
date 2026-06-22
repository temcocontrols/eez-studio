// Stub for pdf-services/pdf-to-png (Node.js service - not available in browser)
export default function pdfToPng(_data: string): Promise<Buffer> {
    console.warn("pdfToPng disabled in browser");
    return Promise.resolve(Buffer.from(""));
}
