const text = document.getElementById("typing-text");
const textArray = text.textContent.split("");
text.textContent = "";

let index = 0;

function type() {
  text.textContent += textArray[index];
  index++;
  if (index < textArray.length) {
    setTimeout(type, 200);
  } else {
    setTimeout(function() {
      text.textContent = "";
      index = 0;
      type();
    }, 1000); 
  }
}

type();