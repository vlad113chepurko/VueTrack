<script setup lang="ts">
import "./_ProjectFilter.scss";
import { projectsFilters } from "./components/index";
</script>
<template>
  <div style="width: 50%">
    <h2 style="margin-bottom: 10px">Filter</h2>
    <div class="filter">
      <projectsFilters.ProjectSearchFilter />
      <projectsFilters.ProjectStatusFilter />
    </div>
  </div>
</template>
