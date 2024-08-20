<script setup>
import { onMounted, reactive } from 'vue';

const state = reactive({
  tasks: [],
  isLoading: true,
});

onMounted(() => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  state.tasks = [...tasks];
  state.isLoading = false;
});
</script>

<template>
  <div v-if="state.isLoading">Loading...</div>
  <div v-else>
    <div v-for="task in state.tasks" :key="task.id">
      <p>{{ task.name }}</p>
    </div>
  </div>
</template>
