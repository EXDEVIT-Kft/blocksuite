import type { ExtensionType } from '@algogrind/block-std';

import { createIdentifier, type ServiceIdentifier } from '@algogrind/global/di';

import type { BlockAdapterMatcher } from '../type.js';
import type { HtmlDeltaConverter } from './delta-converter.js';
import type { HtmlAST } from './type.js';

export type BlockHtmlAdapterMatcher = BlockAdapterMatcher<
  HtmlAST,
  HtmlDeltaConverter
>;

export const BlockHtmlAdapterMatcherIdentifier =
  createIdentifier<BlockHtmlAdapterMatcher>('BlockHtmlAdapterMatcher');

export function BlockHtmlAdapterExtension(
  matcher: BlockHtmlAdapterMatcher
): ExtensionType & {
  identifier: ServiceIdentifier<BlockHtmlAdapterMatcher>;
} {
  const identifier = BlockHtmlAdapterMatcherIdentifier(matcher.flavour);
  return {
    setup: di => {
      di.addImpl(identifier, () => matcher);
    },
    identifier,
  };
}
