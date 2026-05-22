import axios from 'axios';
import { create } from 'zustand';
import { TaskItem } from '../utils/handle-api';

type TaskFilter = 'all' | 'completed' | 'pending';

interface TaskState {
  tasks: TaskItem[];
  loading: boolean;
  filter: TaskFilter;
  editingTask: TaskItem | null;
  fetchTasks: () => Promise<void>;
  addTask: (text: string, completed: boolean, dueDate: string | null) => Promise<boolean>;
  updateTask: (taskId: string, text: string, completed: boolean, dueDate: string | null) => Promise<boolean>;
  deleteTask: (_id: string) => Promise<void>;
  clearTasks: () => void;
  setFilter: (filter: TaskFilter) => void;
  startEditingTask: (task: TaskItem) => void;
  clearEditingTask: () => void;
}

const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: true,
  filter: 'all',
  editingTask: null,

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get<TaskItem[]>(`${baseURL}`);
      set({ tasks: data });
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (text, completed, dueDate) => {
    try {
      await axios.post(`${baseURL}/save`, { text, completed, dueDate });
      await get().fetchTasks();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  updateTask: async (taskId, text, completed, dueDate) => {
    try {
      await axios.post(`${baseURL}/update`, { _id: taskId, text, completed, dueDate });
      await get().fetchTasks();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  deleteTask: async (_id) => {
    try {
      await axios.post(`${baseURL}/delete`, { _id });
      await get().fetchTasks();
    } catch (err) {
      console.log(err);
    }
  },

  clearTasks: () => set({ tasks: [] }),
  setFilter: (filter) => set({ filter }),
  startEditingTask: (task) => set({ editingTask: task }),
  clearEditingTask: () => set({ editingTask: null }),
}));
