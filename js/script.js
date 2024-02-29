"use strict"

//Intersection Observer API
//https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

let options = {
	root: null,
	rootMargin: "0px 0px 0px 0px",
	threshold: 0.3,
};

let callback = (entries, observer) => {
	entries.forEach((entry) => {
		const targetElement = entry.target;
		if (entry.isIntersecting) {
			if (targetElement.classList.contains("anim-left")) {
                targetElement.classList.add("show-left");
              } else if (targetElement.classList.contains("anim-right")) {
                targetElement.classList.add("show-right");
              } else {
                targetElement.classList.add("show");
              }
        }
	});
}

let observer = new IntersectionObserver(callback, options);

/*
const target = document.querySelector(".class-name");
observer.observe(target);
*/

let someElements = document.querySelectorAll("[class*='--anim']");
someElements.forEach(someElement => {
	observer.observe(someElement);
});

//  -------------------  Text Animation -------------------

function processTextBlock(textBlock) {
    const dataChar = textBlock.dataset.char.split(',').map(Number);
    const content = textBlock.textContent;
    textBlock.innerHTML = '';
  
    content.split('').forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
    
        if (char === ' ') {
            const space = document.createTextNode(' ');
            textBlock.appendChild(space);
        } else {
            textBlock.appendChild(span);
            applyAnimation(span, dataChar, i);
        }
    });
}
  
function applyAnimation(span, dataChar, i) {
    if (dataChar.length > 0) {
        const delayIncrement = dataChar[0] || 1000;
        const delay = delayIncrement + i * (dataChar[1] || 50);

        span.style.opacity = "0";
        span.style.transform = "scale(0)";
        span.style.transformOrigin = "top";
        span.style.transition = `opacity 500ms ease-in-out ${delay}ms`;

        setTimeout(() => {
            span.style.opacity = "1";
            span.style.transform = "scale(1)";
            span.style.transition = `transform 300ms ease-in-out 0ms`;
        }, delay);
    }
}
  
document.querySelectorAll("[data-char]").forEach(processTextBlock);