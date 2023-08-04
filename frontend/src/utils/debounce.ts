let available = true;
const timeout = 2000;
function init() {
  available = true;
}
// debounce 함수
export function debouncedAlert(a: string) {
  if (available) {
    available = false;
    setTimeout(init, timeout);
    alert(a);
  }
}
