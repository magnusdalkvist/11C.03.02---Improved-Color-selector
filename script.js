window.addEventListener("DOMContentLoaded", colorSelect);

function colorSelect() {
  document.querySelector("input").addEventListener("input", showColor);
}

function showColor() {
  let color = document.querySelector("input").value;
  let rgb = hexToRGB(color);
  let hex = RGBToHex(rgb);
  let hsl = RGBToHSL(rgb);
  let css = RGBToCSS(rgb);
  colorBox(css);
  showHex(hex);
  showRGB(rgb);
  showHSL(hsl);
}

function colorBox(css) {
  document.querySelector("#color").style.background = css;
}

function showHex(hex) {
  document.querySelector("#hex").textContent = `HEX: ${hex}`;
}

function showRGB(rgb) {
  document.querySelector("#rgb").textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function showHSL(hsl) {
  document.querySelector("#hsl").textContent = `HSL: ${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}

function hexToRGB(color) {
  let r = parseInt(color.substring(1, 3), 16).toString(10);
  let g = parseInt(color.substring(3, 5), 16).toString(10);
  let b = parseInt(color.substring(5), 16).toString(10);

  return { r, g, b };
}

function RGBToHex(rgb) {
  let r = Number(rgb.r).toString(16);
  let g = Number(rgb.g).toString(16);
  let b = Number(rgb.b).toString(16);

  if (r.length == 1) {
    r = "0" + r;
  }
  if (g.length == 1) {
    g = "0" + g;
  }
  if (b.length == 1) {
    b = "0" + b;
  }

  hexString = `#${r}${g}${b}`;

  return hexString.toUpperCase();
}

function RGBToHSL(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  return { h, s, l };
}

function RGBToCSS(rgb) {
  let css = `rgb(${rgb.r}, ${rgb.g}, ${rgb.g})`;

  return css;
}
