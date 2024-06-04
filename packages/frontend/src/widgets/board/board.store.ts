import type { ApiSchema } from 'api';
import { create } from 'zustand';

type Task = ApiSchema['CardEntity'];
type Column = ApiSchema['ColumnEntity'];

interface BoardState {
  board: ApiSchema['BoardEntity'] | null;

  tasks: Task[];
  columns: Column[];

  activeColumn: Column | null;
  activeTask: Task | null;

  setTasks: (tasks: Task[]) => void;
  setColumns: (columns: Column[]) => void;

  setActiveColumn: (column: Column | null) => void;
  setActiveTask: (column: Task | null) => void;
}

export const useBoard = create<BoardState>((set) => ({
  board: null,
  columns: [],
  tasks: [],
  activeColumn: null,
  activeTask: null,
  setTasks: (tasks) => set({ tasks }),
  setColumns: (columns) => set({ columns }),
  setActiveColumn: (activeColumn) => set({ activeColumn }),
  setActiveTask: (activeTask) => set({ activeTask }),
}));
