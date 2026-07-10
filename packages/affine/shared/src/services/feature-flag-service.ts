import { type Store, StoreExtension } from '@blocksuite/store';
import { type Signal, signal } from '@preact/signals-core';

export interface BlockSuiteFlags {
  enable_database_attachment_note: boolean;
  enable_database_full_width: boolean;
  enable_block_query: boolean;
  enable_edgeless_text: boolean;
  enable_ai_onboarding: boolean;
  enable_ai_chat_block: boolean;
  enable_color_picker: boolean;
  enable_mind_map_import: boolean;
  enable_advanced_block_visibility: boolean;
  enable_shape_shadow_blur: boolean;
  enable_mobile_keyboard_toolbar: boolean;
  enable_mobile_linked_doc_menu: boolean;
  enable_mobile_database_editing: boolean;
  enable_block_meta: boolean;
  enable_edgeless_scribbled_style: boolean;
  enable_table_virtual_scroll: boolean;
  enable_turbo_renderer: boolean;
  enable_dom_renderer: boolean;
  enable_pdfmake_export: boolean;
  // [ALGOGRIND] gates database view creation in the slash menu (fork commit 714bff02a)
  algogrind_enable_database: boolean;
}

export class FeatureFlagService extends StoreExtension {
  static override key = 'feature-flag-server';

  private readonly _flags: Signal<BlockSuiteFlags> = signal({
    enable_database_attachment_note: true,
    enable_database_full_width: true,
    enable_block_query: false,
    // [ALGOGRIND] flag defaults ported from fork playground defaultFlags
    enable_edgeless_text: false,
    enable_ai_onboarding: false,
    enable_ai_chat_block: false,
    enable_color_picker: true,
    enable_mind_map_import: false,
    enable_advanced_block_visibility: true,
    enable_shape_shadow_blur: true,
    enable_mobile_keyboard_toolbar: true,
    enable_mobile_linked_doc_menu: false,
    enable_block_meta: true,
    enable_mobile_database_editing: false,
    enable_edgeless_scribbled_style: false,
    enable_table_virtual_scroll: false,
    enable_turbo_renderer: false,
    enable_dom_renderer: false,
    enable_pdfmake_export: false,
    // [ALGOGRIND] gates database view creation; enabled by default matching
    // the fork's final state (714bff02a removed it, a later commit restored
    // it behind this flag with a true default)
    algogrind_enable_database: true,
  });

  setFlag(key: keyof BlockSuiteFlags, value: boolean) {
    this._flags.value = {
      ...this._flags.value,
      [key]: value,
    };
  }

  getFlag(key: keyof BlockSuiteFlags) {
    return this._flags.value[key];
  }

  constructor(store: Store) {
    super(store);
  }
}
