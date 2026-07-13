import { NotificationProvider } from '@blocksuite/affine-shared/services';
import { type BlockStdScope } from '@blocksuite/std';

import { toast } from '../toast/toast.js';

function notify(std: BlockStdScope, title: string, message: string) {
  const notification = std.getOptional(NotificationProvider);
  const { host } = std;

  if (!notification) {
    toast(host, title);
    return;
  }

  notification.notifyWithUndoAction({
    title,
    message,
    accent: 'info',
    duration: 10 * 1000,
  });
}

export function notifyLinkedDocSwitchedToCard(std: BlockStdScope) {
  notify(
    std,
    'Nézet frissítve',
    'Az alias módosítása kikapcsolta a szinkronizálást. A beágyazás kártya nézetre váltott.'
  );
}

export function notifyLinkedDocSwitchedToEmbed(std: BlockStdScope) {
  notify(
    std,
    'Beágyazott nézet visszaállítva',
    'Az egyéni alias törölve. A hivatkozott dokumentum újra az eredeti címet és leírást mutatja.'
  );
}

export function notifyLinkedDocClearedAliases(std: BlockStdScope) {
  notify(
    std,
    'Sikeres visszaállítás',
    'A kártya nézet újra az eredeti dokumentumcímet és leírást mutatja. Minden egyéni alias törölve lett.'
  );
}
