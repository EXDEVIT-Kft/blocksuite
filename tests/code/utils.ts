import type { Page } from '@playwright/test';

/**
 * @example
 * ```ts
 * const codeBlockController = getCodeBlock(page);
 * const codeBlock = codeBlockController.codeBlock;
 * ```
 */
export function getCodeBlock(page: Page) {
  const codeBlock = page.locator('affine-code');
  const languageButton = page.getByTestId('lang-button');

  const clickLanguageButton = async () => {
    await codeBlock.hover();
    await languageButton.click({ delay: 50 });
  };

  const langList = page.locator('affine-filterable-list');
  const langFilterInput = langList.locator('#filter-input');

  const codeToolbar = page.locator('affine-code-toolbar');

  const copyButton = codeToolbar.getByRole('button', { name: 'Kód másolása' });
  const captionButton = codeToolbar.getByRole('button', { name: 'Felirat' });
  const moreButton = codeToolbar.getByRole('button', { name: 'Továbbiak' });

  const menu = page.locator('.more-popup-menu');

  const openMore = async () => {
    await moreButton.click();

    const wrapButton = menu.getByRole('button', { name: 'Tördelés' });
    const cancelWrapButton = menu.getByRole('button', {
      name: 'Tördelés kikapcsolása',
    });
    const duplicateButton = menu.getByRole('button', { name: 'Duplikálás' });
    const deleteButton = menu.getByRole('button', { name: 'Törlés' });

    return {
      menu,
      wrapButton,
      cancelWrapButton,
      duplicateButton,
      deleteButton,
    };
  };

  return {
    codeBlock,
    codeToolbar,
    captionButton,
    languageButton,
    langList,
    copyButton,
    moreButton,
    langFilterInput,
    moreMenu: menu,

    openMore,
    clickLanguageButton,
  };
}
