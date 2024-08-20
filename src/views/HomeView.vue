<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import TaskLists from '@/components/TaskLists.vue';
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <main class="bg-white w-7/12 p-7 rounded-xl">
      <NavigationBar />
      <TaskLists />
    </main>
  </div>
</template>
