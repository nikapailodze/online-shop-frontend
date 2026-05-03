import { getStoredToken } from "../lib/auth";

export const authHeaders = (): Record<string, string> => {
  const token = getStoredToken();
  if (!token) {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

export const fileToOptimizedDataUrl = async (file: File) => {
  const originalDataUrl = await readFileAsDataUrl(file);

  if (!file.type.startsWith("image/")) {
    return originalDataUrl;
  }

  const image = await loadImage(originalDataUrl);
  const maxDimension = 1600;
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const targetWidth = Math.max(1, Math.round(image.width * scale));
  const targetHeight = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext("2d");
  if (!context) {
    return originalDataUrl;
  }

  context.drawImage(image, 0, 0, targetWidth, targetHeight);

  const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
  const optimizedDataUrl =
    mimeType === "image/png"
      ? canvas.toDataURL(mimeType)
      : canvas.toDataURL(mimeType, 0.82);

  return optimizedDataUrl.length < originalDataUrl.length
    ? optimizedDataUrl
    : originalDataUrl;
};
