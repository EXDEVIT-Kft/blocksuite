import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/affine-ext-loader';
import { AccordionBlockSchemaExtension } from '@blocksuite/affine-model';

export class AccordionStoreExtension extends StoreExtensionProvider {
  override name = 'algogrind-accordion-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(AccordionBlockSchemaExtension);
  }
}
