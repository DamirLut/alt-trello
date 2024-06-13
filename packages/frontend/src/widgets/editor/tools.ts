// eslint-disable-next-line @typescript-eslint/ban-ts-comment
///@ts-nocheck installing types???
import editorJsCodeCup from '@calumk/editorjs-codecup';
import AttachesTool from '@editorjs/attaches';
import Checklist from '@editorjs/checklist';
import type { I18nConfig } from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Underline from '@editorjs/underline';
import ToggleBlock from 'editorjs-toggle-block';

import { CustomImageTool } from './tools/CustomImage';

export const tools = {
  header: { class: Header, inlineToolbar: true },
  paragraph: { class: Paragraph, inlineToolbar: true },
  LinkTool: {
    class: LinkTool,
    inlineToolbar: true,
    config: {
      endpoint: '/api/utils/fetchUrl',
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
    class: CustomImageTool,
    inlineToolbar: true,
    config: {
      endpoints: {
        byFile: '/api/utils/uploadImage',
        byUrl: '/api/utils/fetchUrl',
      },
      buttonContent: 'Выберите изображение',
      actions: [
        {
          name: 'cover_image',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"></rect><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.13968 15.32L8.69058 11.5661C9.02934 11.2036 9.48873 11 9.96774 11C10.4467 11 10.9061 11.2036 11.2449 11.5661L15.3871 16M13.5806 14.0664L15.0132 12.533C15.3519 12.1705 15.8113 11.9668 16.2903 11.9668C16.7693 11.9668 17.2287 12.1705 17.5675 12.533L18.841 13.9634"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.7778 9.33331H13.7867"></path></svg>',
          title: 'Обложка',
          toggle: true,
          action: () => '',
        },
      ],
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
      image: {
        'With border': 'Обводка',
        'Stretch image': 'Растянуть',
        'With background': 'С фоном',
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
