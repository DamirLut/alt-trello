// eslint-disable-next-line @typescript-eslint/ban-ts-comment
///@ts-nocheck installing types???
import editorJsCodeCup from '@calumk/editorjs-codecup';
import AttachesTool from '@editorjs/attaches';
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
import Underline from '@editorjs/underline';
import ToggleBlock from 'editorjs-toggle-block';

export const tools = {
  header: { class: Header, inlineToolbar: true },
  paragraph: { class: Paragraph, inlineToolbar: true },
  LinkTool: {
    class: LinkTool,
    inlineToolbar: true,
    config: {
      endpoint: '/api/utils/fetchUrl', // Your backend endpoint for url data fetching,
    },
  },
  toggle: {
    class: ToggleBlock,
    inlineToolbar: true,
    config: {
      placeholder: 'Блок',
      defaultContent: 'Пустой блок. Добавьте текст сюда',
    },
  },
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
    inlineToolbar: true,
    config: {
      endpoints: {
        byFile: '/api/utils/uploadImage',
        byUrl: '/api/utils/fetchUrl',
      },
      buttonContent: 'Выберите изображение',
    },
  },
  attaches: {
    class: AttachesTool,
    config: {
      endpoint: '/api/utils/uploadFile',
      buttonText: 'Выберите файл',
    },
  },
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  code: {
    class: editorJsCodeCup,
    inlineToolbar: true,
    config: {
      showlinenumbers: false,
    },
  },
  Marker: {
    class: Marker,
    inlineToolbar: true,
  },
  inlineCode: {
    class: InlineCode,
    inlineToolbar: true,
  },
  underline: { class: Underline, inlineToolbar: true },
};

export const i18n: I18nConfig = {
  messages: {
    tools: {
      header: {
        'Heading 1': 'Заголовок 1',
        'Heading 2': 'Заголовок 2',
        'Heading 3': 'Заголовок 3',
        'Heading 4': 'Заголовок 4',
        'Heading 5': 'Заголовок 5',
        'Heading 6': 'Заголовок 6',
      },
      LinkTool: {
        Link: 'Ссылка',
        "Couldn't fetch the link data": 'Ну удалось загрузить ссылку',
      },
      list: {
        Unordered: 'Маркерованый',
        Ordered: 'Нумерованый',
      },
    },
    ui: {
      blockTunes: {
        toggler: {
          'Click to tune': 'Нажмите, чтобы настроить',
          'or drag to move': 'или перетащите',
        },
      },
      inlineToolbar: {
        converter: {
          'Convert to': 'Конвертировать в',
        },
      },
      toolbar: {
        toolbox: {
          Add: 'Добавить',
        },
      },
      popover: {
        Filter: 'Поиск',
        'Nothing found': 'Ничего не найдено',
        'Convert to': '',
      },
    },
    toolNames: {
      Text: 'Параграф',
      Heading: 'Заголовок',
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
      Toggle: 'Блок',
      Image: 'Изображение',
      CodeCup: 'Код',
      Underline: 'Подчеркнутый',
      Attachment: 'Файл',
    },
    blockTunes: {
      delete: {
        Delete: 'Удалить',
      },
      moveUp: {
        'Move up': 'Переместить вверх',
      },
      moveDown: {
        'Move down': 'Переместить вниз',
      },
    },
  },
};
