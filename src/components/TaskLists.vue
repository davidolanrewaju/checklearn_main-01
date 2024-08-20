<script setup>
import { onMounted, reactive, ref } from 'vue';
import DeleteModal from '@/components/DeleteModal.vue';

const state = reactive({
  tasks: [],
  isLoading: true,
  taskToDelete: null,
});

onMounted(() => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  state.tasks = [...tasks];
  state.isLoading = false;
});

const isModalOpen = ref(false);

function handleModal(task = null) {
  state.taskToDelete = task;
  isModalOpen.value = !isModalOpen.value;
}

function deleteTask() {
  if (state.taskToDelete) {
    state.tasks = state.tasks.filter((task) => task.id !== state.taskToDelete.id);
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    handleModal();
  }
}
</script>

<template>
  <div v-if="state.isLoading">Loading...</div>
  <div v-else>
    <div
      v-for="task in state.tasks"
      :key="task.id"
      class="flex items-center gap-5 my-4 p-4 bg-indigo-300 rounded-md hover:bg-indigo-400 cursor-pointer transition-all duration-500 ease-in-out transform"
    >
      <div class="flex items-center gap-5 w-full">
        <div class="w-8 h-8 border-2 flex items-center justify-center rounded-full">
          <i class="pi pi-check text-indigo-500 text-sm"></i>
        </div>
        <p class="text-white font-lexend text-lg flex-grow">{{ task.name }}</p>
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 flex items-center justify-center rounded-full p-5 hover:bg-gray-300 hover:bg-opacity-70 transition-all duration-300 ease-in-out transform"
          >
            <i class="pi pi-pen-to-square text-white text-lg"></i>
          </div>
          <div
            @click="handleModal(task)"
            class="w-8 h-8 flex items-center justify-center rounded-full p-5 hover:bg-gray-300 hover:bg-opacity-70 transition-all duration-300 ease-in-out transform"
          >
            <i class="pi pi-times text-white text-lg"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <DeleteModal :isOpen="isModalOpen" @confirmDelete="deleteTask" @handleModal="handleModal" />
</template>
