<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import DeleteModal from '@/components/DeleteModal.vue';
import EditModal from '@/components/EditModal.vue';

const searchTerm = ref('');
const taskToEdit = ref(null);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const state = reactive({
  tasks: [],
  isLoading: true,
  taskToDelete: null,
});

onMounted(() => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  state.tasks = tasks.map((task) => ({
    ...task,
    showFullDescription: false,
  }));
  state.isLoading = false;
});

function deleteTask() {
  if (state.taskToDelete) {
    state.tasks = state.tasks.filter((task) => task.id !== state.taskToDelete.id);
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    closeDeleteModal();
  }
}

function completeTask(task) {
  const index = state.tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    state.tasks[index].status =
      state.tasks[index].status === 'complete' ? 'incomplete' : 'complete';
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }
}

function updateTask(updatedTask) {
  const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
  if (index !== -1) {
    state.tasks[index] = { ...updatedTask, showFullDescription: false };
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }
  closeEditModal();
}

function openDeleteModal(task) {
  state.taskToDelete = task;
  isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
  state.taskToDelete = null;
  isDeleteModalOpen.value = false;
}

function openEditModal(task) {
  taskToEdit.value = task;
  isEditModalOpen.value = true;
}

function closeEditModal() {
  taskToEdit.value = null;
  isEditModalOpen.value = false;
}

const filteredTasks = computed(() => {
  if (!searchTerm.value) return state.tasks;
  return state.tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );
});

const toggleFullDescription = (task) => {
  task.showFullDescription = !task.showFullDescription;
};

const getTruncatedDescription = (description, showFull) => {
  if (!description) return '';
  if (!showFull && description.length > 30) {
    return description.substring(0, 30) + '...';
  }
  return description;
};
</script>

<template>
  <div v-if="state.isLoading" class="font-montserrat">Loading...</div>
  <div v-else class="mt-7">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="search tasks..."
      class="w-full font-lexend placeholder:font-lexend placeholder:font-light p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-700 focus:ring-opacity-30"
    />

    <div
      v-for="task in filteredTasks"
      :key="task.id"
      class="flex shadow-lg items-center gap-5 mt-4 p-4 bg-indigo-500 rounded-md hover:bg-indigo-400 cursor-pointer transition-all duration-500 ease-in-out transform"
    >
      <div class="flex items-center gap-5 w-full">
        <div
          @click="completeTask(task)"
          :class="[
            'w-8 h-8 flex items-center justify-center rounded-full border-4 border-white cursor-pointer',
            task.status === 'complete' ? 'bg-indigo-950 border-transparent' : '',
          ]"
        >
          <i :class="['pi text-sm', task.status === 'complete' ? 'pi-check text-white' : '']"></i>
        </div>
        <div class="flex-grow">
          <p class="text-white font-lexend text-lg">{{ task.name }}</p>
          <p v-if="task.description" class="text-white italic text-sm">
            {{ getTruncatedDescription(task.description, task.showFullDescription) }}
          </p>
          <button
            v-if="task.description && task.description.length > 30"
            @click="toggleFullDescription(task)"
            class="text-xs mt-2 text-white underline"
          >
            {{ task.showFullDescription ? 'Show Less' : 'Show More' }}
          </button>
        </div>
        <div class="flex items-center gap-3">
          <div
            @click="openEditModal(task)"
            class="w-8 h-8 flex items-center justify-center rounded-full p-5 hover:bg-gray-300 hover:bg-opacity-70 transition-all duration-300 ease-in-out transform"
          >
            <i class="pi pi-pen-to-square text-white text-lg"></i>
          </div>
          <div
            @click="openDeleteModal(task)"
            class="w-8 h-8 flex items-center justify-center rounded-full p-5 hover:bg-gray-300 hover:bg-opacity-70 transition-all duration-300 ease-in-out transform"
          >
            <i class="pi pi-times text-white text-lg"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <DeleteModal
    :isOpen="isDeleteModalOpen"
    @confirmDelete="deleteTask"
    @handleModal="closeDeleteModal"
  />
  <EditModal
    :isEditOpen="isEditModalOpen"
    :taskToEdit="taskToEdit"
    @handleModal="closeEditModal"
    @updateTask="updateTask"
  />
</template>
