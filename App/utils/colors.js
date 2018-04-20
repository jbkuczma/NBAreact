/**
 * convert a hex string to an array of its r, g, b values
 * @param {string} hex - hex color string
 * @returns {array} - contains r, g, b values of the hex string
 */
export const hexToRGB = (hex) => {
  hex = hex.charAt(0) === '#' ? hex.substring(1) : hex

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return [r, g, b]
}

/**
 * check the similarity between two colors
 * @param {string} color1
 * @param {string} color2
 * @returns {number} - value between 0 and 1, 1 being the same color
 */
export const hexColorDelta = (color1, color2) => {
  // get red/green/blue values for color
  const [r1, g1, b1] = hexToRGB(color1)
  const [r2, g2, b2] = hexToRGB(color2)

  // calculate differences between reds, greens and blues
  let r = 255 - Math.abs(r1 - r2)
  let g = 255 - Math.abs(g1 - g2)
  let b = 255 - Math.abs(b1 - b2)
  // normalize
  r /= 255
  g /= 255
  b /= 255
  // 0 means opposite colors, 1 means same colors
  return (r + g + b) / 3
}

/**
 * adjust the luminance of a color
 * @param {string} color - hex representation of color
 * @param {number} luminance - luminosity factor: -0.1 is 10% darker, 0.2 is 20% lighter
 * @returns {string} - new hex string after applying luminance to provided hex
 */
export const adjustLuminance = (color, luminance) => {

  // replace any invalid character with a space
  color = String(color).replace(/[^0-9a-f]/gi, '')
  luminance = luminance || 0

  // convert to decimal and change luminosity
  let rgb = "#"
  for (let i = 0; i < 3; i++) {
    let c = parseInt(color.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + (c * luminance)), 255)).toString(16)
    rgb += ("00" + c).substr(c.length)
  }

  return rgb
}
