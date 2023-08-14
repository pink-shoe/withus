import { useAtom } from 'jotai';
import { errorAtom } from 'stores/error';

let available = true;
const timeout = 2000;
function init() {
  available = true;
}

// debounce 함수
export function debouncedAlert(message: string) {
  console.log('asdfasdfasd', 'globalError');
  // const [globalError, setGlobalError] = useAtom(errorAtom);
  // console.log('bbbbbbbbbbbbbbbbbbbbb', message);
  if (available) {
    available = false;
    setTimeout(init, timeout);
    // setGlobalError('');
    // setError(a);
    alert(message);
  }
}
