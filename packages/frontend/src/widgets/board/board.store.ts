import type { ApiSchema } from 'api';
import { create } from 'zustand';

type Task = ApiSchema['CardEntity'];
type Column = ApiSchema['ColumnEntity'];

type StoreSet<T> = (callback: (value: T) => T) => void;

interface BoardState {
  board: ApiSchema['BoardEntity'] | null;

  tasks: Task[];
  columns: Column[];

  activeColumn: Column | null;
  activeTask: Task | null;

  setTasks: StoreSet<Task[]>;
  setColumns: StoreSet<Column[]>;

  setActiveColumn: (column: Column | null) => void;
  setActiveTask: (column: Task | null) => void;
}

export const useBoard = create<BoardState>((set) => ({
  board: null,
  columns: [],
  tasks: [],
  activeColumn: null,
  activeTask: null,
  setTasks: (callback) => set((prev) => ({ tasks: callback(prev.tasks) })),
  setColumns: (callback) =>
    set((prev) => ({ columns: callback(prev.columns) })),
  setActiveColumn: (activeColumn) => set({ activeColumn }),
  setActiveTask: (activeTask) => set({ activeTask }),
}));
