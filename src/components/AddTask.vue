<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const task = reactive({
  taskName: '',
  taskDescription: '',
});
const errorMessage = ref('');

function addTask(event) {
  event.preventDefault();

  if (task.taskName.trim() === '') {
    errorMessage.value = 'Task name cannot be empty';
    return;
  }

  const newTask = {
    id: Date.now(),
    name: task.taskName,
    description: task.taskDescription,
    status: 'incomplete',
    createdAt: new Date().toISOString(),
  };

  // Get existing tasks from localStorage
  const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  // Add new task to the array
  existingTasks.push(newTask);

  // Save updated tasks back to localStorage
  localStorage.setItem('tasks', JSON.stringify(existingTasks));

  // Clear the form
  task.taskName = '';
  task.taskDescription = '';

  toast.success('Task added successfully!');
  router.push('/');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <main class="bg-white w-full mx-3 md:mx-0 md:w-7/12 p-7 rounded-xl shadow-md">
      <div>
        <div class="flex items-center justify-between">
          <h1 class="font-unbounded font-bold text-2xl">Add Task</h1>
          <i class="pi pi-book text-indigo-500 text-4xl"></i>
        </div>
        <hr class="border-t border-gray-400 my-3" />

        <form class="mt-9">
          <div class="mb-4">
            <label for="taskName" class="block font-montserrat font-semibold text-gray-500">
              Task Name
            </label>
            <input
              v-model="task.taskName"
              type="text"
              id="taskName"
              name="taskName"
              class="mt-1 pl-2 py-2 block font-montserrat w-full rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-40"
            />
            <p v-if="errorMessage" class="text-red-400 font-lexend text-sm">*{{ errorMessage }}</p>
          </div>
          <div class="mb-8">
            <label for="taskDescription" class="block font-montserrat font-semibold text-gray-500">
              Description
            </label>
            <textarea
              v-model="task.taskDescription"
              id="taskDescription"
              name="taskDescription"
              rows="3"
              class="mt-1 pl-2 py-2 block font-montserrat w-full rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-40"
            ></textarea>
          </div>
          <button
            type="submit"
            class="font-lexend border-2 border-indigo-500 text-indigo-500 font-bold py-2 px-4 rounded-md hover:border-transparent hover:bg-indigo-500 hover:text-white"
            @click="addTask"
          >
            Add Task
          </button>
        </form>
      </div>
    </main>
  </div>
</template>
