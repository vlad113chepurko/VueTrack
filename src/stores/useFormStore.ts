import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
  state: () => ({
    isFormOpen: false,
    isUpdateFormOpen: false,
  }),
  actions: {
    openForm() {
      this.isFormOpen = true;
    },
    closeForm() {
      this.isFormOpen = false;
    },
    openUpdateForm() {
      this.isUpdateFormOpen = true;
    },
    closeUpdateForm() {
      this.isUpdateFormOpen = false;
    },
  },
});
