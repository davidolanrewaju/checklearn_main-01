<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="font-unbounded font-bold text-2xl">My TodoList</h1>
    <button
      class="w-32 flex flex-row-reverse items-center justify-between py-2 px-4 bg-indigo-500 rounded-md hover:bg-indigo-700"
    >
      <RouterLink to="/add-task" class="font-lexend text-white">New Task</RouterLink>
      <i class="pi pi-plus text-white"></i>
    </button>
  </div>
  <hr class="border-t border-gray-400 my-5" />
</template>
