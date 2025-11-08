import type { Task } from "@/interfaces";
import { useTasksStore } from "@/stores/useTasksStore";
import { useModalStore } from "@/stores/useModalStore";

class TaskService {
  static addTaskToProject(newTask: Task, projects: Array<any>) {
    const taskStore = useTasksStore();
    const modalStore = useModalStore();

    taskStore.addTask(newTask);

    modalStore.createModal(`Task ${newTask.TaskName} was created!`);

    const projectIndex = projects.findIndex((p) => p.ID === newTask.ProjectID);
    if (projectIndex !== -1) {
      const project = projects[projectIndex];

      const updatedTasks = project!.Tasks
        ? [...project!.Tasks, newTask]
        : [newTask];

      projects[projectIndex] = {
        ID: project!.ID,
        ProjectName: project!.ProjectName,
        ProjectDescription: project!.ProjectDescription,
        Status: project!.Status,
        CreateAt: project!.CreateAt,
        Tasks: updatedTasks,
        TaskCounter: updatedTasks.length,
      };
    }
  }
}

export { TaskService };