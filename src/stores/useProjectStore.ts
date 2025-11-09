import { defineStore } from "pinia";
import type { Project } from "@/types/project.type";
import { ref, watch } from "vue";

export const useProjectStore = defineStore("project", () => {
  const projects = ref<Project[]>(
    localStorage.getItem("projects")
      ? JSON.parse(localStorage.getItem("projects")!)
      : []
  );

  const filteredProjects = ref<Project[]>([...projects.value]);

  const selectedStatus = ref("All");
  const projectName = ref("");
  const sortType = ref<
    | "Default"
    | "nameAsc"
    | "nameDesc"
    | "idAsc"
    | "idDesc"
    | "countAsc"
    | "countDesc"
    | "statusActive"
    | "statusCompleted"
  >("Default");

  watch(
    projects,
    (newVal) => {
      localStorage.setItem("projects", JSON.stringify(newVal));
      updateFiltered();
    },
    { deep: true }
  );

  function updateFiltered() {
    let temp = [...projects.value];

    if (selectedStatus.value !== "All") {
      temp = temp.filter(
        (p) => p.Status?.toLowerCase() === selectedStatus.value.toLowerCase()
      );
    }
    if (projectName.value) {
      temp = temp.filter((p) =>
        p.ProjectName?.toLowerCase().includes(projectName.value.toLowerCase())
      );
    }

    switch (sortType.value) {
      case "nameAsc":
        temp.sort((a, b) =>
          (a.ProjectName || "").localeCompare(b.ProjectName || "")
        );
        break;
      case "nameDesc":
        temp.sort((a, b) =>
          (b.ProjectName || "").localeCompare(a.ProjectName || "")
        );
        break;
      case "idAsc":
        temp.sort((a, b) => a.ID - b.ID);
        break;
      case "idDesc":
        temp.sort((a, b) => b.ID - a.ID);
        break;
      case "countAsc":
        temp.sort((a, b) => (a.TaskCounter || 0) - (b.TaskCounter || 0));
        break;
      case "countDesc":
        temp.sort((a, b) => (b.TaskCounter || 0) - (a.TaskCounter || 0));
        break;
      case "statusActive":
        temp.sort((a, _) => (a.Status === "Active" ? -1 : 1));
        break;
      case "statusCompleted":
        temp.sort((a, _) => (a.Status === "Completed" ? -1 : 1));
        break;
    }

    filteredProjects.value = temp;
  }

  watch([selectedStatus, projectName, sortType], updateFiltered);

  function addProject(newProject: Project) {
    projects.value.push(newProject);
  }

  function updateProject(updatedProject: Project) {
    const index = projects.value.findIndex((p) => p.ID === updatedProject.ID);
    if (index !== -1) {
      projects.value[index] = updatedProject;
    }
  }

  function deleteProject(projectId: number) {
    projects.value = projects.value.filter((p) => p.ID !== projectId);
  }

  function getProjectById(id: number) {
    return projects.value.find((p) => p.ID === id);
  }

  function setStatusFilter(status: string) {
    selectedStatus.value = status;
  }

  function setNameFilter(name: string) {
    projectName.value = name;
  }

  function setSort(type: typeof sortType.value) {
    sortType.value = type;
  }

  return {
    projects,
    filteredProjects,
    selectedStatus,
    projectName,
    sortType,
    addProject,
    getProjectById,
    setStatusFilter,
    setNameFilter,
    setSort,
    updateFiltered,
    updateProject,
    deleteProject,
  };
});
