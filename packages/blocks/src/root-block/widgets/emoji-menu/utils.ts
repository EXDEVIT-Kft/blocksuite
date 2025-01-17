/*import type { InlineEditor, InlineRange } from '@algogrind/inline';
import type { BlockModel } from '@algogrind/store';

import type {
  EmojiMenuActionItem,
  EmojiMenuCategory,
  EmojiMenuContext,
} from './config.js';

export function emojiItemClassName(item: EmojiMenuActionItem) {
  return item.shortcodes.join('-');
}

export function filterEnabledEmojiItems(
  items: EmojiMenuCategory[]
  context: EmojiMenuContext
) {
  return items.filter(() => true); // no block-based filtering for now
}

export function getFirstFocusableEmoji(
  items: EmojiMenuActionItem[]
): EmojiMenuActionItem | null {
  return items.length ? items[0] : null;
}

export function getEmojiQuery(
  inlineEditor: InlineEditor | null,
  startRange: InlineRange | null
) {
  if (!inlineEditor || !startRange) return null;
  const range = inlineEditor.getInlineRange();
  if (!range || range.index < startRange.index) return null;
  const textPoint = inlineEditor.getTextPoint(range.index);
  if (!textPoint) return null;
  const [leafStart, offsetStart] = textPoint;
  const text = leafStart.textContent ?? '';
  const sliced = text.slice(0, offsetStart);
  const match = sliced.match(/:([A-Za-z0-9]+)$/);
  if (!match) return null;
  return match[1] ?? null;
}

export function createKeydownObserverForEmoji({
  target,
  signal,
  interceptor,
  onInput,
  onPaste,
  onDelete,
  onAbort,
}: {
  target: EventTarget;
  signal: AbortSignal;
  interceptor: ((e: KeyboardEvent, next: () => void) => void) | undefined;
  onInput: (isComposition: boolean) => void;
  onPaste: () => void;
  onDelete: () => void;
  onAbort: () => void;
}) {
  target.addEventListener(
    'keydown',
    (event: KeyboardEvent) => {
      if (event.isComposing) return;
      interceptor(event, () => {
        const { key } = event;
        if (key === 'Backspace') {
          onDelete();
        }
        if (
          key.length === 1 ||
          key === 'Enter' ||
          key === 'ArrowUp' ||
          key === 'ArrowDown' ||
          key === 'ArrowLeft' ||
          key === 'ArrowRight' ||
          key === 'Escape'
        ) {
          onInput(false);
        }
      });
    },
    { signal }
  );

  target.addEventListener(
    'compositionend',
    () => {
      onInput(true);
    },
    { signal }
  );

  target.addEventListener(
    'paste',
    () => {
      onPaste();
    },
    { signal }
  );

  signal.addEventListener('abort', () => {
    onAbort();
  });
}

export function cleanTailForEmoji(model: BlockModel, matchedShortcode: string) {
  const textContent = model.text?.toString() ?? '';
  const replaced = textContent.replace(
    new RegExp(`:${matchedShortcode}$`, 'gi'),
    ''
  );
  if (replaced !== textContent) {
    model.text?.delete(0, model.text.length ?? 0);
    model.text?.insert(replaced, 0);
  }
}
*/
console.log('.');
