
export const NO_USER_IMAGE = 'https://res.cloudinary.com/kerutman/image/upload/v1704497755/noimage_s61lqx.png';

const cloudinaryUrl = async (file) => {

    const uploadURL = "https://api.cloudinary.com/v1_1/kerutman/image/upload";
    const uploadPreset = "ftgzoex2";

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset); // Replace with your Cloudinary upload preset

    try {
        const response = await fetch(uploadURL, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return 'error';
        }
    } catch (error) {
        return 'error';
    }
};

export default cloudinaryUrl

export function resizeCloudinaryImage(image, width = 125, height = 125) {
    //* https://res.cloudinary.com/demo/image/upload/c_fill,h_300,w_250/e_blur:300/sample.jpg
    //* https://res.cloudinary.com/kerutman/image/upload/v1686318966/Canteen/1.webp
    const replaceImage = image.replace("upload/", `upload/c_thumb,w_${width},h_${height}/`);
    return replaceImage;
}

export function resizeProfilePicture(image, width = 200, height = 200) {
    const replaceImage = image.replace("upload/", `upload/c_thumb,g_face,w_${width},h_${height}/r_max/f_auto/`);
    return replaceImage;
}

