"use client";

import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const takeScreenshot = async (url) => {
  const pdf = await pdfjs.getDocument(url).promise;
  const page = await pdf.getPage(1);

  // 80% zoom
  const viewport = page.getViewport({ scale: 0.8 });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({ canvasContext: context, viewport }).promise;
  return canvas.toDataURL("image/png");
};

export default takeScreenshot;
