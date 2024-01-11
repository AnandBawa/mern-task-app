import { Navigate, redirect, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { AddTask, TasksList } from "../components";
import customFetch from "../utils/customFetch";

export const tasksAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const { action, id } = data;

    if (action === "add") {
      try {
        delete data.action;
        delete data.id;
        data.title = data.title.trim();
        data.title = data.title.at(0).toUpperCase() + data.title.slice(1);
        data.description = data.description.trim();
        data.description =
          data.description.at(0).toUpperCase() + data.description.slice(1);

        await customFetch.post(`/tasks`, data);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success(`Task Added`);
      } catch (error) {
        toast.error(error?.response?.data?.message || "There was an error");
      }
      return redirect(`/tasks`);
    }

    if (action === "update") {
      try {
        delete data.action;
        delete data.id;
        data.title = data.title.trim();
        data.title = data.title.at(0).toUpperCase() + data.title.slice(1);
        data.description = data.description.trim();
        data.description =
          data.description.at(0).toUpperCase() + data.description.slice(1);
        data.completed = data.completed === "true" ? true : false;

        await customFetch.patch(`/tasks/${id}`, data);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success(`Task Updated`);
      } catch (error) {
        toast.error(error?.response?.data?.message || "There was an error");
      }
      return redirect(`/tasks`);
    }

    if (action === "delete") {
      try {
        await customFetch.delete(`/tasks/${id}`);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success(`Task removed`);
      } catch (error) {
        toast.error(error?.response?.data?.message || "There was an error");
      }
      return redirect(`/tasks`);
    }

    if (action === "clear") {
      try {
        await customFetch.patch(`/tasks`);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success(`Tasks Cleared`);
      } catch (error) {
        toast.error(error?.response?.data?.message || "There was an error");
      }
      return redirect(`/tasks`);
    }

    return null;
  };

const Tasks = () => {
  const user = useOutletContext();

  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <AddTask />
      <TasksList />
    </>
  );
};

export default Tasks;
