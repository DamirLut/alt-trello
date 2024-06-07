import { type FC, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import EditorJS from '@editorjs/editorjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';
import Undo from 'editorjs-undo';

import { boardQueries } from 'entities/board';

import { i18n, tools } from './tools';

import './editor.module.scss';

interface EditorProps {
  data: ApiSchema['CardEntity'];
}

export const Editor: FC<EditorProps> = ({ data }) => {
  const { id: board_id, task } = useParams<{ id: string; task: string }>();
  const taskId = Number(task?.split('-')[0]);
  const ref = useRef<EditorJS | null>(null);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    boardQueries(queryClient).setCardContent(),
  );

  useEffect(() => {
    if (ref.current) return;
    const editor = new EditorJS({
      holder: 'editor',
      tools,
      i18n,

      data: data.content as never,
      onReady() {
        ref.current = editor;
        const undo = new Undo({ editor });
        undo.initialize(data.content as never);
      },
      onChange: async () => {
        const content = await editor.saver.save();

        await mutateAsync({
          board_id: board_id!,
          card_id: taskId,
          content: content as never,
        });
        console.log('content updated');
      },
    });

    return () => {
      ref.current?.destroy();
      ref.current = null;
    };
  }, []);

  return <div id='editor' />;
};
