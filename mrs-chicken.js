var chicken = document.getElementsByClassName("chicken")[0];
var container = document.getElementsByClassName("game-board")[0];
var scale = 1.0;
chicken.style.top = "250px";
chicken.style.left = "250px";

var colors = ["yellow", "red", "blue", "brown", "purple", "green", "pink"];
var colorIdx = 0;

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);
container.addEventListener("mousemove", drag, false);
container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === chicken) {
    active = true;
  }
}

function drag(e) {
  // e.preventDefault();
  if (active) {
    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, chicken);
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function changeColor() {
  if (colorIdx < colors.length) {
    colorIdx++;
  } else {
    colorIdx = 0;
  }

  chicken.style.backgroundColor = colors[colorIdx];
}

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 38) {
    // up
    console.log(chicken.style.top);
    var top = parseInt(chicken.style.top);
    console.log("top", top - 25 + "px");
    chicken.style.top = top - 25 + "px";
  } else if (evt.keyCode === 39) {
    // right
    var left = parseInt(chicken.style.left);
    chicken.style.left = left + 25 + "px";
    chicken.style.transform = "scale(-1, 1)";
  } else if (evt.keyCode === 37) {
    // left    
    var left = parseInt(chicken.style.left);
    chicken.style.left = left - 25 + "px";
    chicken.style.transform = "scale(1, 1)";
  } else if (evt.keyCode === 40) {
    // down    
    var top = parseInt(chicken.style.top);
    chicken.style.top = top + 25 + "px";
  } else if (evt.keyCode === 82) {
    chicken.style.top = "150px";
    chicken.style.left = "150px";
    chicken.style.width = "50px";
    chicken.style.height = "50px";
  } else if (evt.keyCode === 188) {
    scale -= 0.1;
    // chicken.transform = 'scale(' + scale + ', ' + scale + ')';
    var width = parseInt(chicken.offsetWidth);
    var height = parseInt(chicken.offsetHeight);
    chicken.style.width = width - 20 + "px";
    chicken.style.height = height - 20 + "px";
  } else if (evt.keyCode === 190) {
    scale += 0.1;

    //chicken.transform = HJNNJ'scale(' + scale + ', ' + scale + ')';
    var width = parseInt(chicken.offsetWidth);
    var height = parseInt(chicken.offsetHeight);    
    chicken.style.width = width + 20 + "px";
    chicken.style.height = height + 20 + "px";
  } else if (evt.keyCode === 32) {
    // space.
    changeColor();
  }
});
