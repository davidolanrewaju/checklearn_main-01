<script setup lang="ts">
import { ref, computed } from 'vue';
import DeleteModal from '@/components/DeleteModal.vue';
import EditModal from '@/components/EditModal.vue';
import { useTaskStore } from '@/composables/useTaskStore';

interface Task {
  id: number;
  name: string;
  description: string;
  status: 'complete' | 'incomplete';
  showFullDescription?: boolean;
}

const searchTerm = ref('');
const taskToEdit = ref<Task | null>(null);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const taskToDelete = ref<Task | null>(null);

const { tasks, isLoading, updateTask, deleteTask, completeTask, filteredTasks } = useTaskStore();

const computedFilteredTasks = computed(() => filteredTasks(searchTerm.value));

function openDeleteModal(task: Task) {
  taskToDelete.value = task;
  isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
  taskToDelete.value = null;
  isDeleteModalOpen.value = false;
}

function openEditModal(task: Task) {
  taskToEdit.value = task;
  isEditModalOpen.value = true;
}

function closeEditModal() {
  taskToEdit.value = null;
  isEditModalOpen.value = false;
}

function handleDeleteTask() {
  if (taskToDelete.value) {
    deleteTask(taskToDelete.value.id); // Ensure deleteTask is passed the correct ID
    closeDeleteModal();
  }
}

const toggleFullDescription = (task: Task) => {
  task.showFullDescription = !task.showFullDescription;
};

const getTruncatedDescription = (description: string, showFull: boolean | undefined) => {
  if (!description) return '';
  if (!showFull && description.length > 30) {
    return description.substring(0, 30) + '...';
  }
  return description;
};
</script>

<template>
  <div v-if="isLoading" class="font-montserrat">Loading...</div>
  <div v-else class="mt-7">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="search tasks..."
      class="w-full font-lexend placeholder:font-lexend placeholder:font-light p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-700 focus:ring-opacity-30"
    />

    <div
      v-for="task in computedFilteredTasks"
      :key="task.id"
      class="flex shadow-lg items-center gap-5 mt-4 p-4 bg-indigo-500 rounded-md hover:bg-indigo-400 cursor-pointer transition-all duration-500 ease-in-out transform"
    >
      <div class="flex items-center gap-5 w-full">
        <div
          @click="completeTask(task.id)"
          :class="[
            'w-8 h-8 flex items-center justify-center rounded-full border-4 cursor-pointer',
            task.status === 'complete' ? 'bg-indigo-950 border-transparent' : 'border-white',
          ]"
          aria-label="Toggle task completion"
        >
          <i :class="['pi text-sm', task.status === 'complete' ? 'pi-check text-white' : '']"></i>
        </div>
        <div class="flex-grow">
          <p
            :class="[
              'text-white font-lexend text-lg',
              task.status === 'complete' ? 'line-through' : '',
            ]"
          >
            {{ task.name }}
          </p>
          <p v-if="task.description" class="text-white italic text-sm">
            {{ getTruncatedDescription(task.description, task.showFullDescription ?? false) }}
          </p>
          <button
            v-if="task.description && task.description.length > 30"
            @click="toggleFullDescription(task)"
            class="text-xs mt-2 text-white underline"
          >
            {{ task.showFullDescription ? 'Show Less' : 'Show More' }}
          </button>
        </div>
        <div class="flex items-center gap-1 md:gap-3">
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
    @confirmDelete="handleDeleteTask"
    @handleModal="closeDeleteModal"
  />

  <EditModal
    :isEditOpen="isEditModalOpen"
    :taskToEdit="taskToEdit"
    @handleModal="closeEditModal"
    @updateTask="updateTask"
  />
</template>
