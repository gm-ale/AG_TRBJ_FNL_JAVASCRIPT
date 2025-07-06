const images = document.querySelectorAll('.img');
const containerImage = document.querySelector('.container_img');
const imageContainer = document.querySelector('.img_show');
const copy = document.querySelector('.copy')
const closeElement = document.querySelector('.bx.bx-x')

images.forEach(image =>{
    image.addEventListener('click' , ()=>{

        addImage(image.getAttribute('src'), image.getAttribute('alt'))

    })
})

const addImage = (srcImg, altImg)=>{
  containerImage.classList.toggle('move')
  imageContainer.classList.toggle('show');
  imageContainer.src = srcImg;
  copy.innerHTML = altImg;
}

closeElement.addEventListener('click', ()=>{
      containerImage.classList.toggle('move');
      imageContainer.classList.toggle('show');
})