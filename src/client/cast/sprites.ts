// The SVG cast as images, for things that end up on the canvas lane.
// Three versions of each, one per boil filter, so they wobble like everything else.
import { fatMan, gerald, goodBall, pigeon, vending } from './cast.ts';
import { DEFS, hurtMarks } from './draw.ts';

const img = (inner: string, viewBox: string) => [0, 1, 2].map((boil) => {
  const i = new Image();
  i.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><defs>${DEFS}</defs><g filter="url(#boil${boil})">${inner}</g></svg>`);
  return i;
});
const WHOLE = '0 0 200 260';
export const SPRITES = {
  bucket: img(gerald('alarm'), '8 190 60 68'), bucketHurt: img(gerald('hurt'), '8 190 60 68'),
  fatman: img(fatMan('alarm'), WHOLE), fatmanHurt: img(fatMan('hurt') + hurtMarks, WHOLE),
  lump: img(fatMan('calm'), WHOLE), lumpHurt: img(fatMan('hurt') + hurtMarks, WHOLE),
  runner: img(fatMan('alarm'), WHOLE), runnerHurt: img(fatMan('hurt') + hurtMarks, WHOLE),
  stray: img(goodBall(), '55 172 100 86'),
  pigeon: img(pigeon(), '0 70 200 190'),
  vending: img(vending(), '20 0 160 260'),
};
