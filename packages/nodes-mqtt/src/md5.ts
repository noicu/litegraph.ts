export function md5(message: string): string {
  function rotateLeft(n: number, s: number): number {
    return (n << s) | (n >>> (32 - s));
  }

  const k = new Array(
    0x67452301,
    0xefcdab89,
    0x98badcfe,
    0x10325476
  );
  const s = new Array(7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22);
  const a = 0x5a827999;
  const b = 0x6ed9eba1;
  const c = 0x8f1bbcdc;
  const d = 0xca62c1d6;

  const messageLength = message.length * 8;
  const messageArray = new Array<number>();
  let i: number;
  let j: number;
  for (i = 0; i < message.length - 3; i += 4) {
    j = message.charCodeAt(i) | (message.charCodeAt(i + 1) << 8) | (message.charCodeAt(i + 2) << 16) | (message.charCodeAt(i + 3) << 24);
    messageArray.push(j);
  }

  switch (message.length % 4) {
    case 0:
      i = 0x080000000;
      break;
    case 1:
      i = message.charCodeAt(message.length - 1) << 24 | 0x0800000;
      break;
    case 2:
      i = message.charCodeAt(message.length - 2) << 24 | message.charCodeAt(message.length - 1) << 16 | 0x08000;
      break;
    case 3:
      i = message.charCodeAt(message.length - 3) << 24 | message.charCodeAt(message.length - 2) << 16 | message.charCodeAt(message.length - 1) << 8 | 0x80;
      break;
  }
  messageArray.push(i);

  while ((messageArray.length % 16) != 14) {
    messageArray.push(0);
  }

  messageArray.push(messageLength & 0xffffffff);
  messageArray.push(Math.floor(messageLength / 0x100000000));

  let f: number;
  let g: number;
  let temp: number;
  let h = k.slice();
  let words: number[];
  for (i = 0; i < messageArray.length; i += 16) {
    words = messageArray.slice(i, i + 16);
    for (j = 0; j < 64; j++) {
      if (j < 16) {
        f = (h[1] & h[2]) | ((~h[1]) & h[3]);
        g = j;
      } else if (j < 32) {
        f = (h[3] & h[1]) | ((~h[3]) & h[2]);
        g = (5 * j + 1) % 16;
      } else if (j < 48) {
        f = h[1] ^ h[2] ^ h[3];
        g = (3 * j + 5) % 16;
      } else {
        f = h[2] ^ (h[1] | (~h[3]));
        g = (7 * j) % 16;
      }
      temp = h[3];
      h[3] = h[2];
      h[2] = h[1];
      h[1] = h[1] + rotateLeft((h[0] + f + words[g] + (j < 16 ? a : j < 32 ? b : j < 48 ? c : d)), s[j]);
      h[0] = temp;
    }
    for (j = 0; j < 4; j++) {
      k[j] += h[j];
    }
  }

  let output = '';
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 8; j++) {
      output += String.fromCharCode((k[i] >>> (j * 8)) & 0xff);
    }
  }
  return output;
}
