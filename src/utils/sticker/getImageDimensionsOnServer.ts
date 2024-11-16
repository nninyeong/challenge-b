import sharp from 'sharp';

const getImageDimensionsOnServer = async (url: string): Promise<{ width: number; height: number }> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error on Sticker Prefetch: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) {
      console.error(`Error on Get Image Dimensions on Sticker Prefetch: ${response.statusText}`);
    }

    return {
      width: metadata.width ?? 100,
      height: metadata.height ?? 100,
    };
  } catch (error) {
    throw new Error(`Error on Get Sticker Dimensions on Sticker Prefetch: ${error}`);
  }
};

export default getImageDimensionsOnServer;
