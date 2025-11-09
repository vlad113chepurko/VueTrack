<script setup lang="ts">
import "./_Modal.scss";
import { watch, onUnmounted } from "vue";
import { useModalStore } from "@/stores/useModalStore";

const modalStore = useModalStore();

let timer: number | null = null;

watch(
  () => modalStore.isModal,
  (isOpen) => {
    if (isOpen) {
      timer = window.setTimeout(() => {
        modalStore.closeModal();
      }, 10000);
    } else if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
);

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div v-if="modalStore.isModal" class="modal">
    <p>{{ modalStore.message }}</p>
    <button @click="modalStore.closeModal()">X</button>
  </div>
</template>
