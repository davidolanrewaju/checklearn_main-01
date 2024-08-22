<script setup>
import { defineEmits } from 'vue';
import { useToast } from 'vue-toastification';

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const toast = useToast();
const emit = defineEmits(['handleModal']);

const closeModal = () => {
  emit('handleModal', false);
};

const deleteTask = () => {
  emit('confirmDelete');
  toast.success('Task deleted successfully');
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-lexend font-semibold">Delete Task</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>
      <p class="font-lexend text-gray-700 mb-6">Are you sure you want to delete this task?</p>
      <div class="px-10 flex items-center justify-between">
        <button
          @click="deleteTask"
          class="w-28 font-lexend bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Continue
        </button>
        <button
          @click="closeModal"
          class="w-28 font-lexend bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
