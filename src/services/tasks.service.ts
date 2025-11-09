import type { Task } from "@/types/task.type";
import { useTasksStore } from "@/stores/useTasksStore";
import { useModalStore } from "@/stores/useModalStore";
import axios from "axios";

class TaskService {
  static addTaskToProject(newTask: Task) {
    const taskStore = useTasksStore();
    const modalStore = useModalStore();

    axios
      .post("http://localhost:3000/tasks/create", newTask)
      .then((response) => console.log(response.data))
      .catch((error) =>
        console.error("There was an error creating the task!", error)
      );

    taskStore.addTask(newTask);
    modalStore.createModal(`Task ${newTask.TaskName} was created!`);
  }

  static deleteTaskById(taskId: number) {
    const taskStore = useTasksStore();
    const modalStore = useModalStore();

    axios
      .delete(`http://localhost:3000/tasks/delete/${taskId}`)
      .then((response) => console.log(response.data))
      .catch((error) =>
        console.error("There was an error deleting the task!", error)
      );

    taskStore.deleteTask(taskId);
    modalStore.createModal(`Task with ID ${taskId} was deleted!`);
  }

  static updateTask(updatedTask: Task) {
    const taskStore = useTasksStore();
    const modalStore = useModalStore();

    axios
      .put(`http://localhost:3000/tasks/update/${updatedTask.ID}`, updatedTask)
      .then((response) => console.log("Task updated:", response.data))
      .catch((error) =>
        console.error("There was an error updating the task!", error)
      );

    taskStore.updateTask(updatedTask);
    modalStore.createModal(`Task "${updatedTask.TaskName}" was updated!`);
  }
}

export { TaskService };
