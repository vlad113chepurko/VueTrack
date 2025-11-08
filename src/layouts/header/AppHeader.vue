<script setup lang="ts">
import "./_Header.scss";
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <nav class="nav">
      <RouterLink class="nav__button" to="/">Home</RouterLink>
      <RouterLink class="nav__button" to="/projects">Projects</RouterLink>
    </nav>
  </header>
</template>
