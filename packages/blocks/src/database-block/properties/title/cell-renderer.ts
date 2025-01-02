import {
  type CellRenderProps,
  createFromBaseCellRenderer,
  createIcon,
  uniMap,
} from '@algogrind/data-view';
import { TableSingleView } from '@algogrind/data-view/view-presets';

import { titlePurePropertyConfig } from './define.js';
import { HeaderAreaTextCell, HeaderAreaTextCellEditing } from './text.js';

export const titleColumnConfig = titlePurePropertyConfig.createPropertyMeta({
  icon: createIcon('TitleIcon'),
  cellRenderer: {
    view: uniMap(
      createFromBaseCellRenderer(HeaderAreaTextCell),
      (props: CellRenderProps) => ({
        ...props,
        showIcon: props.cell.view instanceof TableSingleView,
      })
    ),
    edit: uniMap(
      createFromBaseCellRenderer(HeaderAreaTextCellEditing),
      (props: CellRenderProps) => ({
        ...props,
        showIcon: props.cell.view instanceof TableSingleView,
      })
    ),
  },
});
