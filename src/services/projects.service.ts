import type { Project } from "@/interfaces/index";
import { useModalStore } from "@/stores/useModalStore";
class ProjectsService {
  static addProject(newProject: Project, projectStore: any) {
    const modalStore = useModalStore();

    projectStore.addProject(newProject);

    modalStore.createModal(`Project ${newProject.ProjectName} was created!`);
  }
}

export { ProjectsService };
