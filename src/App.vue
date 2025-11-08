<script setup lang="ts">
import "./_App.scss";
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";
import { layouts } from "@/layouts/index";
import { components } from "@/components/index";

const route = useRoute();
</script>

<template>
  <main class="app-container">
    <components.ModalWindow />

    <layouts.AppHeader />
    <p
      style="
        align-self: flex-start;
        margin-left: 20px;
        margin-top: 10px;
        color: grey;
      "
    >
      {{ route.fullPath }}
    </p>
    <RouterView />
  </main>
</template>
