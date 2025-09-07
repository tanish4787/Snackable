import imagekit from "imagekit";

const imagekit = new imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadFile = async (file, fileName) => {
  try {
    const response = await imagekit.upload({
      file: file,
      fileName: fileName,
    });
    return response;
  } catch (error) {
    console.error("Error uploading file to ImageKit:", error);
    throw error;
  }
};
