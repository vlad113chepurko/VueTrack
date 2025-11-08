<script setup lang="ts">
import { useProjectStore } from "@/stores/useProjectStore";
const projectStore = useProjectStore();
</script>

<template>
  <div class="input__container">
    <label for="by">Search by «Project Name»</label>
    <input
      v-model="projectStore.projectName"
      type="search"
      placeholder="Search by «Project Name»"
    />
  </div>
</template>
