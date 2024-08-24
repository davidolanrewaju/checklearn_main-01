import { ref, computed } from 'vue';

interface Task {
  id: number;
  name: string;
  description: string;
  status: 'complete' | 'incomplete';
  createdAt: string;
  showFullDescription?: boolean;
}

export function useTaskStore() {
  const tasks = ref<Task[]>([]);
  const isLoading = ref(true);

  const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.value = storedTasks.map((task: Task) => ({
      ...task,
      showFullDescription: false,
    }));
    isLoading.value = false;
  };

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const task: Task = {
      id: Date.now(),
      ...newTask,
      status: 'incomplete',
      createdAt: new Date().toISOString(),
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
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  };

  const filteredTasks = computed(() => {
    return (searchTerm: string) => {
      if (!searchTerm) return tasks.value;
      return tasks.value.filter(
        (task) =>
          task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    };
  });

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
