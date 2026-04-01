import { create } from 'zustand';

interface Tool {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface ToolStore {
  selectedTools: string[];
  toggleTool: (toolId: string) => void;
  isSelected: (toolId: string) => boolean;
}

export const useToolStore = create<ToolStore>((set, get) => ({
  selectedTools: [],
  toggleTool: (toolId: string) => {
    set((state) => ({
      selectedTools: state.selectedTools.includes(toolId)
        ? state.selectedTools.filter((id) => id !== toolId)
        : [...state.selectedTools, toolId],
    }));
  },
  isSelected: (toolId: string) => get().selectedTools.includes(toolId),
}));
