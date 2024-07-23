export const useInvertedColor = (hex: string, isHumanReadable?: boolean): string => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((color) => `${color}${color}`)
      .join('');
  }

  if (hex.length !== 6) {
    console.info('Invalid HEX color.');
    return hex;
  }

  let r = parseOctet(hex, 0);
  let g = parseOctet(hex, 1);
  let b = parseOctet(hex, 2);

  if (isHumanReadable) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }

  return `#${[r, g, b].map(getInvertedOctet).join('')}`;
};

const getInvertedOctet = (octet: number): string => (255 - octet).toString(16).padStart(2, '0');

const parseOctet = (hex: string, octetNum: number): number => parseInt(hex.slice(octetNum * 2, octetNum * 2 + 2), 16);
