import { t } from '../i18n.ts';

/** A speech bubble at a spot on the screen. It says its piece and goes. */
export function bubble(text: string, x: number, y: number) {
  const el = document.createElement('div');
  el.className = 'bubble'; el.textContent = t(text);
  el.style.left = `${Math.max(70, Math.min(innerWidth - 70, x))}px`; el.style.top = `${Math.max(40, y)}px`;
  document.body.append(el);
  setTimeout(() => el.remove(), 2300);
}
export const clearBubbles = () => document.querySelectorAll('.bubble').forEach((b) => b.remove());
