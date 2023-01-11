import { createWorker } from "tesseract.js";
const worker = createWorker();

function preprocessImage(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  const image = ctx?.getImageData(0, 0, canvas.width, canvas.height);
  return image;
}
export default preprocessImage;

export const doOCR = async (
  file: string | ImageData,
  setLoading: Function,
  setOcrText: Function
) => {
  setLoading(true);
  // Loading tesseract.js functions
  await worker.load();
  // Loading language as 'English'
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  // Sending the File Object into the Recognize function to
  // parse the data
  const {
    data: { text },
  } = await worker.recognize(file);
  setOcrText(text);
  setLoading(false);
};

export function terminateOcr() {}
