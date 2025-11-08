import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const message = ref<string>("");
  const isModal = ref<boolean>(false);

  const createModal = (newMessage: string) => {
    isModal.value = true;
    message.value = newMessage;
  };

  const closeModal = () => {
    isModal.value = false;
    message.value = "";
  };

  return {
    message,
    isModal,
    closeModal,
    createModal
  };
});
