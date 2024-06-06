// eslint-disable-next-line @typescript-eslint/ban-ts-comment
///@ts-nocheck installing types???
import editorJsCodeCup from '@calumk/editorjs-codecup';
import Checklist from '@editorjs/checklist';
import type { I18nConfig } from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Underline from '@editorjs/underline';
import ToggleBlock from 'editorjs-toggle-block';

export const tools = {
  header: Header,
  paragraph: Paragraph,
  quote: Quote,
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: '/api/utils/fetchUrl', // Your backend endpoint for url data fetching,
    },
  },
  toggle: ToggleBlock,
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered',
    },
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: '/api/utils/uploadFile',
        byUrl: '/api/utils/fetchUrl',
      },
    },
  },
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  code: {
    class: editorJsCodeCup,
    config: {
      showlinenumbers: false,
    },
  },
  Marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M',
  },
  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+M',
  },
  underline: Underline,
};

export const i18n: I18nConfig = {
  messages: {
    toolsNames: {
      Text: 'Параграф',
      header: 'Заголовок',
      List: 'Список',
      Warning: 'Примечание',
      Checklist: 'Чеклист',
      Quote: 'Цитата',
      Code: 'Код',
      Delimiter: 'Разделитель',
      'Raw HTML': 'HTML-фрагмент',
      Table: 'Таблица',
      Link: 'Ссылка',
      Marker: 'Маркер',
      Bold: 'Полужирный',
      Italic: 'Курсив',
      InlineCode: 'Моноширинный',
    },
  },
};
