const secInAMin = 60;
const minsInAnHour = 60;
const secInAnHour = secInAMin * minsInAnHour;

export function parseTime(inSeconds: number) {
  let _left: number;

  const hours = Math.floor(inSeconds / secInAnHour);
  _left = inSeconds % secInAnHour;

  const mins = Math.floor(_left / minsInAnHour);

  _left = Math.floor(_left % secInAMin);
  const sec = _left;

  return {
    hours,
    mins,
    sec,
  };
}

function fmt(x: number) {
  const out = String(x);
  return x > 9 ? out : `0${out}`;
}
export function toTimeStr(inSeconds: number) {
  const {hours, mins, sec} = parseTime(inSeconds);
  return `${fmt(hours)}:${fmt(mins)}:${fmt(sec)}`;
}
