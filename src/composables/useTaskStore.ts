import { ref, computed, Ref } from 'vue';

interface Task {
  id: number;
  name: string;
  description: string;
  status: 'complete' | 'incomplete';
  createdAt: string;
  showFullDescription: boolean;
}

interface TaskStore {
  tasks: Ref<Task[]>;
  isLoading: Ref<boolean>;
  loadTasks: () => void;
  addTask: (newTask: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
  completeTask: (taskId: number) => void;
  filteredTasks: (searchTerm: string) => Task[];
}

export function useTaskStore(): TaskStore {
  const tasks = ref<Task[]>([]);
  const isLoading = ref(true);

  const loadTasks = () => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.value = storedTasks.map((task: Task) => ({
        ...task,
        showFullDescription: false,
      }));
    } catch (error) {
      console.error('Error loading tasks:', error);
      tasks.value = [];
    }
    isLoading.value = false;
  };
  
  loadTasks();

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const task: Task = {
      id: Date.now(),
      ...newTask,
      status: 'incomplete',
      createdAt: new Date().toISOString(),
      showFullDescription: false,
    };
    tasks.value.push(task);
    saveTasks();
  };

  const updateTask = (updatedTask: Task) => {
    const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = { ...updatedTask, showFullDescription: false };
      saveTasks();
    }
  };

  const deleteTask = (taskId: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
    saveTasks();
  };

  const completeTask = (taskId: number) => {
    const index = tasks.value.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks.value[index].status =
        tasks.value[index].status === 'complete' ? 'incomplete' : 'complete';
      saveTasks();
    }
  };

  const saveTasks = () => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const filteredTasks = (searchTerm: string) => {
    if (!searchTerm) return tasks.value;
    return tasks.value.filter(
      (task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return {
    tasks,
    isLoading,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    filteredTasks,
  };
}
