import { BaseBlockModel, IBaseBlockProps, Page } from '@blocksuite/store';
import { literal } from 'lit/static-html.js';

export interface CodeBlockProps extends IBaseBlockProps {
  language: string;
}

export class CodeBlockModel extends BaseBlockModel implements IBaseBlockProps {
  static version = 1;
  flavour = 'affine:code' as const;
  type = 'code' as const;
  tag = literal`affine-code`;

  language: string;

  setLang(lang: string) {
    this.page.updateBlockById(this.id, {
      language: lang,
    });
  }

  constructor(page: Page, props: Partial<CodeBlockProps>) {
    super(page, props);
    this.language = props.language ?? 'JavaScript';
  }

  // TODO block2html

  block2html(
    childText: string,
    _previousSiblingId: string,
    _nextSiblingId: string,
    begin?: number,
    end?: number
  ): string {
    const codeElement = document.querySelector(
      `[data-block-id="${this.id}"] pre`
    );
    if (!codeElement) {
      return super.block2html(
        childText,
        _previousSiblingId,
        _nextSiblingId,
        begin,
        end
      );
    }
    codeElement.setAttribute('code-lang', this.language);
    return codeElement.outerHTML;
  }
}
