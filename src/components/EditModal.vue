<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isEditOpen: Boolean,
  taskToEdit: Object,
});

const emit = defineEmits(['handleModal', 'updateTask']);

const taskName = ref('');
const taskDescription = ref('');

watch(
  () => props.taskToEdit,
  (newTask) => {
    if (newTask) {
      taskName.value = newTask.name || '';
      taskDescription.value = newTask.description || '';
    }
  },
  { immediate: true }
);

const closeEditModal = () => {
  emit('handleModal');
};

// New: Add submitForm function
const submitForm = (e) => {
  e.preventDefault();
  if (taskName.value.trim()) {
    const updatedTask = {
      ...props.taskToEdit,
      name: taskName.value.trim(),
      description: taskDescription.value.trim(),
    };
    emit('updateTask', updatedTask);
  }
};
</script>

<template>
  <div
    v-if="isEditOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-11/12 bg-white rounded-lg shadow-lg md:w-5/12 p-6 relative">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-lexend font-semibold">Edit Task</h2>
        <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>
      <form @submit="submitForm" class="mt-9">
        <!-- Updated: Add form submission -->
        <div class="mb-4">
          <label for="taskName" class="block font-montserrat font-semibold text-gray-500">
            Task Name
          </label>
          <input
            v-model="taskName"
            type="text"
            id="taskName"
            name="taskName"
            class="mt-1 pl-2 py-2 block font-montserrat w-full rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-40"
          />
        </div>
        <div class="mb-8">
          <label for="taskDescription" class="block font-montserrat font-semibold text-gray-500">
            Description
          </label>
          <textarea
            v-model="taskDescription"
            id="taskDescription"
            name="taskDescription"
            rows="3"
            class="mt-1 pl-2 py-2 block font-montserrat w-full rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-40"
          ></textarea>
        </div>
        <div class="flex items-center justify-end">
          <button
            type="submit"
            class="font-lexend border-2 border-indigo-500 text-indigo-500 font-bold py-2 px-4 rounded-md hover:border-transparent hover:bg-indigo-500 hover:text-white"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
