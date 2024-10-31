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


//Prewiew audio upload
const uploadAudio = document.querySelector('[upload-audio]');
if (uploadAudio) {
    const uploadAudioInput = document.querySelector('[upload-audio-input]');
    const uploadAudioPlay = document.querySelector('[upload-audio-play]');
    const sourceAudio = document.querySelector('source');
    // const closeImage = document.querySelector('.btn-close');
    uploadAudioInput.addEventListener('change', (e) => {
        // console.log(e.target.files[0]);
        const file = e.target.files[0];
        if(file){
            sourceAudio.src = URL.createObjectURL(file);
            uploadAudioPlay.load();
            // closeImage.style.display = "block";
        }
    })
}
//end Prewiew audio upload