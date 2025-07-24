const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function throttle(cb, delay = 100) {
  let shouldWait = false;
  let waitingargs;
  let timeoutFunc = () => {
    if (waitingargs == null) {
      shouldWait = false;
    } else {
      cb(waitingargs);
      waitingargs = null;
      setTimeout(timeoutFunc, delay);
    }
  };
  return (...args) => {
    if (shouldWait) {
      waitingargs = args;
      return;
    }
    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}

const updateDebounceText = debounce((text) => {
  debounceText.textContent = text;
});

const updateThrottle = throttle((text) => {
  throttleText.textContent = text;
});

input.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value;
  updateDebounceText(e.target.value);
  updateThrottle(e.target.value);
});
console.log(input);

document.addEventListener("mousemove", () => {
  incrementCount(defaultText);
  updateDebounceMouse();
  updateThrottleMouse();
});

function incrementCount(element) {
  element.textContent = (parseInt(element.innerText) || 0) + 1;
}

const updateDebounceMouse = debounce(() => {
  incrementCount(debounceText);
});

const updateThrottleMouse = throttle(() => {
  incrementCount(throttleText);
});
