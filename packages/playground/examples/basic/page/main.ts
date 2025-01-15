import { createEmptyDoc, PageEditor } from '@algogrind/presets';
import { Text } from '@algogrind/store';

import '../../../style.css';

const doc = createEmptyDoc().init();
const editor = new PageEditor();
editor.doc = doc;
document.body.append(editor);

const paragraphs = doc.getBlockByFlavour('affine:paragraph');
const paragraph = paragraphs[0];
doc.updateBlock(paragraph, { text: new Text('Hello World!') });
