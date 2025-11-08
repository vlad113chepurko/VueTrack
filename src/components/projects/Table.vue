<script setup lang="ts">
import "./_Table.scss";
import THead from "./THead.vue";
import TBody from "./TBody.vue";
</script>

<template>
  <div class="table__container">
    <table>
      <THead />
      <TBody />
    </table>
  </div>
</template>
