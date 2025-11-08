<script setup lang="ts">
import "./_ProjectSort.scss";
import { projectSort } from "./components";
</script>

<template>
  <div style="width: 50%">
    <h2 style="margin-bottom: 10px">Sort</h2>
    <div class="sort">
      <projectSort.ProjectSearchSort />
      <projectSort.ProjectStatusSort />
    </div>
  </div>
</template>
