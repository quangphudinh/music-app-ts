//Prewiew image upload
const uploadImage = document.querySelector('[upload-image]');
if (uploadImage) {
    const uploadImageInput = document.querySelector('[upload-image-input]');
    const uploadImagePreview = document.querySelector('[upload-image-preview]');
    const closeImage = document.querySelector('.btn-close');
    uploadImageInput.addEventListener('change', (e) => {
        // console.log(e.target.files[0]);
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
            closeImage.style.display = "block";
        }
    })
}
//end Prewiew image upload

// Remove image
const removeImage = document.querySelector('[remove-image-upload]');
if (removeImage) {
    const uploadImageInput = document.querySelector('[upload-image-input]');
    const uploadImagePreview = document.querySelector('[upload-image-preview]');
    removeImage.addEventListener('click', () => {
        uploadImagePreview.src = "";
        uploadImageInput.value = "";
        removeImage.style.display = "none";
    })
}
// end Remove image