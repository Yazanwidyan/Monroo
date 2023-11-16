export function ConvertFileToImageBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function GetImageDimensions(imageSrc: string) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = function () {
      const height = img.height;
      const width = img.width;
      resolve({ height, width });
    };

    img.src = imageSrc;
  });
}
