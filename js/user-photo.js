const FILE_TYPES = ['.jpg', '.jpeg', '.png'];
const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const effectPreview = document.querySelectorAll('.effects__preview');

function getUserPhoto() {
  const file = fileChooser.files[0];
  const fileLink = URL.createObjectURL(file);
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    preview.src = fileLink;
    effectPreview.forEach((item) => {
      item.style.backgroundImage = `url(${fileLink})`;
    });
  }
}

export {getUserPhoto};
