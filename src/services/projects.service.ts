import type { Project } from "@/types/project.type";
import { useModalStore } from "@/stores/useModalStore";
import { useTasksStore } from "@/stores/useTasksStore";
import axios from "axios";

class ProjectsService {
  static addProject(newProject: Project, projectStore: any) {
    const modalStore = useModalStore();

    axios
      .post("http://localhost:3000/projects/create", {
        name: newProject.ProjectName,
        description: newProject.ProjectDescription,
      })
      .then((response) => {
        projectStore.addProject(newProject);
        modalStore.createModal(
          `Project ${newProject.ProjectName} was created!`
        );
        console.log("Response: ", response.data);
      })
      .catch((error) => {
        modalStore.createModal(`Failed to create project: ${error.message}`);
      });
  }

  static updateProject(updatedProject: Project, projectStore: any) {
    const modalStore = useModalStore();

    axios
      .put(`http://localhost:3000/projects/update/${updatedProject.ID}`, {
        name: updatedProject.ProjectName,
        statusL: updatedProject.Status,
        description: updatedProject.ProjectDescription,
      })
      .then((response) => {
        projectStore.updateProject(updatedProject);
        modalStore.createModal(
          `Project ${updatedProject.ProjectName} was updated!`
        );
        console.log("Response: ", response.data);
        window.location.reload();
      })
      .catch((error) => {
        modalStore.createModal(`Failed to update project: ${error.message}`);
      });
  }

  static deleteProject(projectId: number, projectStore: any) {
    const modalStore = useModalStore();
    const tasksStore = useTasksStore();

    if (
      tasksStore.tasks.filter((task) => task.ProjectID === projectId).length > 0
    ) {
      modalStore.createModal(
        `Cannot delete project with id ${projectId} because it has associated tasks!`
      );
      return;
    }
    axios
      .delete(`http://localhost:3000/projects/delete/${projectId}`)
      .then((response) => {
        projectStore.deleteProject(projectId);
        modalStore.createModal(`Project with id ${projectId} was deleted!`);
        console.log("Response: ", response.data);
        window.location .reload();
      })
      .catch((error) => {
        modalStore.createModal(`Failed to delete project: ${error.message}`);
      });
  }
}

export { ProjectsService };
