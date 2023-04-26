const cloudinary = require("cloudinary").v2;

// Cloud configuration
cloudinary.config({
  cloud_name: "dpo8tdhvg",
  api_key: "191914542889552",
  api_secret: "n8q6UeZsnnmym-gYzRVW9TRU2-s",
  secure: true,
});

exports.uploadImg = async (fileToUpload, folder) => {
  try {
    const result = await cloudinary.uploader.upload(fileToUpload, {
      folder: `e-commerce/${folder}`,
      resource_type: "auto",
      timestamp: Date.now(),
    });
    return { secure_url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    throw error;
  }
};

exports.deleteImgFromCloud = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
