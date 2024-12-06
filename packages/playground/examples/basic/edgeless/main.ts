import { createEmptyDoc, EdgelessEditor } from '@algogrind/presets';

import '../../../style.css';

const doc = createEmptyDoc().init();
const editor = new EdgelessEditor();
editor.doc = doc;
document.body.append(editor);
