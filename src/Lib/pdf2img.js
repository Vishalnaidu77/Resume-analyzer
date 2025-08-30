/**
 * @typedef {object} PdfConversionResult
 * @property {string} imageUrl - The URL of the generated image.
 * @property {File | null} file - The generated image file.
 * @property {string} [error] - An error message if conversion failed.
 */

let loadPromise = null;

/**
 * Loads the pdf.js library dynamically and caches the promise.
 * @returns {Promise<any>} A promise that resolves with the pdf.js library object.
 */
function loadPdfJs() {
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    const pdfjsLib = await import("pdfjs-dist/build/pdf.mjs");
    // Set the worker source to use a local file
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    return pdfjsLib;
  })();

  return loadPromise;
}

/**
 * Converts the first page of a PDF file to a PNG image.
 * @param {File} file The PDF file to convert.
 * @returns {Promise<PdfConversionResult>} A promise that resolves with the conversion result.
 */
export async function convertPdfToImage(file) {
  try {
    const lib = await loadPdfJs();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 4 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (context) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    }

    await page.render({ canvasContext: context, viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create a File from the blob with the same name as the pdf
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        1.0
      ); // Set quality to maximum (1.0)
    });
  } catch (err) {
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${err}`,
    };
  }
}