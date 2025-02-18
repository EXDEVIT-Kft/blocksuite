export interface BlockSuiteFlags {
  // -> converting between different embed block styles
  // gets synced across the network automatically
  enable_synced_doc_block: boolean;
  // Edgeless -> shortcut: Q
  enable_pie_menu: boolean;
  // Database --->
  enable_database_number_formatting: boolean;
  enable_database_attachment_note: boolean;
  enable_database_full_width: boolean;
  enable_block_query: boolean;
  // <--- database
  enable_legacy_validation: boolean;
  // Edgeless extra items / config --->
  enable_lasso_tool: boolean;
  enable_edgeless_text: boolean;
  enable_color_picker: boolean;
  enable_mind_map_import: boolean;
  enable_shape_shadow_blur: boolean;
  enable_advanced_block_visibility: boolean;
  // <--- edgeless extra items / config
  enable_ai_onboarding: boolean;
  enable_ai_chat_block: boolean;
  // updated drag and drop feature
  enable_new_dnd: boolean;
  enable_mobile_keyboard_toolbar: boolean;
  enable_mobile_linked_doc_menu: boolean;
  readonly: Record<string, boolean>;
  // [ALGOGRIND] algogrind specific feature flags
  algogrind_enable_database: boolean;
}
export * from './virtual-keyboard.js';
