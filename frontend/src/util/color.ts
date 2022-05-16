export function hex2int(hex: string) {
  const hexStr = hex.substring(1);
  return Number(`0x${hexStr}`);
}

export function int2hex(int: number) {
  let hex = Number(int).toString(16);
  hex = `#${"000000".substring(0, 6 - hex.length)}${hex}`;
  return hex;
}

export function hex2rgb(hex: string): [number, number, number] {
  hex = hex.replace("#", "");
  const r = hex.substring(0, 2);
  const g = hex.substring(2, 4);
  const b = hex.substring(4, 6);
  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
}
