import imageCompression from 'browser-image-compression';

export const compressImageTwice = async (file: File) => {
  const firstCompressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
    initialQuality: 0.9,
  };

  try {
    const firstCompressedFile = await imageCompression(file, firstCompressionOptions);

    const secondCompressionOptions = {
      maxSizeMB: 0.9,
      maxWidthOrHeight: 900,
      useWebWorker: true,
      initialQuality: 0.8,
    };

    const secondCompressedFile = await imageCompression(firstCompressedFile, secondCompressionOptions);

    return secondCompressedFile;
  } catch (error) {
    console.error(error);
  }
};
