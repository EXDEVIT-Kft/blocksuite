import { AccordionBlockComponent } from './accordion-block';

export function effects() {
  customElements.define('algogrind-accordion', AccordionBlockComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    'algogrind-accordion': AccordionBlockComponent;
  }
}
