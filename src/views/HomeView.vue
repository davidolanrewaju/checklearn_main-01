<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import TaskLists from '@/components/TaskLists.vue';
</script>

<template>
  <div class="md:min-h-screen flex items-center justify-center">
    <main class="bg-white w-full md:w-7/12 p-7 md:rounded-xl md:shadow-lg">
      <NavigationBar />
      <TaskLists />
    </main>
  </div>
</template>
