const STEP = 25;
const LONG_TOUCH_DURATION = 500;
const COLORS = ['yellow', 'red', 'blue', 'brown', 'purple', 'green', 'pink'];

const chicken = document.getElementsByClassName('chicken')[0];
const container = document.getElementsByClassName('game-board')[0];
const originalEgg = document.getElementsByClassName('egg-original')[0];
const scoreSpan = document.getElementsByClassName('score-value')[0];
const colorBtn = document.getElementsByClassName('color')[0];
const resetBtn = document.getElementsByClassName('reset')[0];

let scale = 1.0;
chicken.style.top = '250px';
chicken.style.left = '250px';
originalEgg.style.top = '250px';
originalEgg.style.left = '250px';

let colorIdx = 0;

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let score = 0;
let touchTimer = null;
var rotate = 90;

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

function longTouch(x, y) {
  if (touchTimer) {
    clearTimeout(touchTimer);
    touchTimer = null;
  }
  container.dispatchEvent(
    new CustomEvent('longtouch', {
      x,
      y,
    }),
  );
}

function dropEgg(x, y) {
  const egg = document.getElementsByClassName('egg-original')[0];
  const droppedEgg = egg.cloneNode();
  droppedEgg.classList.remove('egg-original');

  document.getElementsByClassName('game-board')[0].prepend(droppedEgg);
  setTranslate(x, y, droppedEgg);
  droppedEgg.style.transform += ' rotate(90deg)';
  droppedEgg.style.display = 'block';
  incrementScore(10);
}

function reset() {
  chicken.style.top = '250px';
  chicken.style.left = '250px';
  chicken.style.width = '50px';
  chicken.style.height = '50px';
  chicken.style.transform = '';
}

function dragStart(e) {
  if (e.target === resetBtn) {
    e.preventDefault();
    reset();
  } else if (e.target === colorBtn) {
    e.preventDefault();
    changeColor();
  } else {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    if (!touchTimer) {
      touchTimer = setTimeout(longTouch, LONG_TOUCH_DURATION);
    }

    if (e.target === chicken) {
      active = true;
    }
  }
}

function drag(e) {
  if (active) {
    e.preventDefault();

    if (touchTimer) {
      clearTimeout(touchTimer);
      touchTimer = null;
    }

    if (e.type === 'touchmove') {
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

  if (touchTimer) {
    clearTimeout(touchTimer);
    isTouching = false;
  }

  const eggX = currentX;
  const eggY = currentY + 50;
  dropEgg(eggX, eggY);
}

function incrementScore(scoreDelta) {
  score += scoreDelta;
  scoreSpan.innerHTML = score;
}

function changeColor() {
  if (colorIdx < COLORS.length) {
    colorIdx += 1;
  } else {
    colorIdx = 0;
  }

  chicken.style.backgroundColor = COLORS[colorIdx];
}

function layEgg(evt) {}

container.addEventListener('touchstart', dragStart, false);
container.addEventListener('touchend', dragEnd, false);
container.addEventListener('touchmove', drag, false);
container.addEventListener('mousemove', drag, false);
container.addEventListener('mousedown', dragStart, false);
container.addEventListener('mouseup', dragEnd, false);
container.addEventListener('dblclick', layEgg, false);
container.addEventListener('longtouch', changeColor, false);

window.addEventListener('keydown', (evt) => {
  const left = parseInt(chicken.style.left);
  const top = parseInt(chicken.style.top);
  
  if (evt.keyCode === 38) {
    // up.
    chicken.style.top = `${top - STEP}px`;
  } else if (evt.keyCode === 39) {
    // right.
    chicken.style.left = `${left + STEP}px`;
    chicken.style.transform = 'scale(-1, 1)';
  } else if (evt.keyCode === 37) {
    // left.
    chicken.style.left = `${left - STEP}px`;
    chicken.style.transform = 'scale(1, 1)';
  } else if (evt.keyCode === 40) {
    // down.
    chicken.style.top = `${top + STEP}px`;
  } else if (evt.keyCode === 82) {
    reset();
  } else if (evt.keyCode === 188) {
    scale -= 0.1;
    // chicken.transform = 'scale(' + scale + ', ' + scale + ')';
    const width = parseInt(chicken.offsetWidth);
    const height = parseInt(chicken.offsetHeight);
    chicken.style.width = `${width - STEP}px`;
    chicken.style.height = `${height - STEP}px`;
  } else if (evt.keyCode === 190) {
    scale += 0.1;
    // chicken.transform = HJNNJ'scale(' + scale + ', ' + scale + ')';
    const width = parseInt(chicken.offsetWidth);
    const height = parseInt(chicken.offsetHeight);
    chicken.style.width = `${width + 20}px`;
    chicken.style.height = `${height + 20}px`;
  } else if (evt.keyCode === 32) {
    // space.
    changeColor();
  } else if (evt.keyCode === 69) {
    const eggX = currentX;
    const eggY = currentY + 50;
    dropEgg(eggX, eggY);
  } else if (evt.keyCode === 83) {
    // Spin
    if (rotate <= 180) {
      rotate += 30;
    } 
    else {
      rotate = 0;
    }
    setTranslate(currentX, currentY, chicken);
    chicken.style.transform += ' rotate(' + rotate + 'deg)';
  }
});
