// Simple and quick debounce :)
export default function debounceWrap(fn, time = 250) {
  let timer = null;

  return function debounce() {
    const args = arguments; // eslint-disable-line

    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, time);
  };
}
