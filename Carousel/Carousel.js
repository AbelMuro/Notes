const track = document.querySelector(".carouselTracker");                   //selecting the container that contains all the images/slides
const slides = Array.from(track.children);                                  //creating an array of images/slides from the container above
const nextButton = document.querySelector(".carouselButton_right");
const prevButton = document.querySelector(".carouselButton_left");
const slideWidth = slides[0].getBoundingClientRect().width;                 //getting the width property of one image/slide, (all images have the same width)
const dotsNav = document.querySelector(".carouselNav");
const dots = Array.from(dotsNav.children);



//arranging the slides/images next to each other with the 'left' property
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
});

//this arrow function will move the track container to a certain position horizontally
const updateSlide = (currentSlide, nextOrPrevSlide) => {
    track.style.transform = "translateX(-" + nextOrPrevSlide.style.left + ")";
    currentSlide.classList.remove("currentSlide");
    nextOrPrevSlide.classList.add("currentSlide");
};

const updateDots = (currentDot, clickedDot) => {
    currentDot.classList.remove("currentSlide");
    clickedDot.classList.add("currentSlide");
}


//moving the track container to the right
nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".currentSlide");
    if(currentSlide.nextElementSibling == null)
        return;
    const nextSlide = currentSlide.nextElementSibling; 
    updateSlide(currentSlide, nextSlide);  

    const currentDot = dotsNav.querySelector(".currentSlide");
    const nextDot = currentDot.nextElementSibling; 
    updateDots(currentDot, nextDot);
});

//moving the track container to the left
prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".currentSlide");
    if(currentSlide.previousElementSibling == null)
        return;
    const prevSlide = currentSlide.previousElementSibling;
    updateSlide(currentSlide, prevSlide);

    const currentDot = dotsNav.querySelector(".currentSlide");
    const prevDot = currentDot.previousElementSibling;
    updateDots(currentDot, prevDot);
});


//
dotsNav.addEventListener("click", e => {
    const clickedDot = e.target.closest("button");              //if user clicked on a button inside the container, then it will return a reference to it
    if(!clickedDot) return;                                     //otherwise, it will return null

    const currentSlide = track.querySelector(".currentSlide");
    const currentDot = dotsNav.querySelector(".currentSlide");
    const targetIndex = dots.findIndex(dot => dot === clickedDot)   //will only return the index of an element if the expression in the arrow function returns true
    const targetSlide = slides[targetIndex];

    updateDots(currentDot, clickedDot);
    updateSlide(currentSlide, targetSlide);

})




