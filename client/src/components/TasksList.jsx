import { Form, useOutletContext } from "react-router-dom";
import TaskCard from "./TaskCard";

const TasksList = () => {
  const { tasks } = useOutletContext();

  if (tasks.length === 0) {
    return (
      <p className="align-element mt-4 text-lg font-medium tracking-wide">
        No tasks added
      </p>
    );
  }

  return (
    <section className="mt-4">
      <div className="align-element flex justify-between">
        <h2 className="text-xl font-medium tracking-wider place-self-center">
          All Tasks
        </h2>
        <label
          htmlFor="clearListModal"
          className="btn btn-sm btn-ghost text-secondary place-self-center text-lg tracking-wide"
        >
          Clear List
        </label>
        <input type="checkbox" id="clearListModal" className="modal-toggle" />
        <div className="modal px-1" role="dialog">
          <div className="modal-box px-3 py-2">
            <h3 className="font-bold text-lg">Clear List</h3>
            <div className="divider my-0 py-0"></div>
            <p className="py-2">Do you wish to remove all tasks?</p>
            <div className="modal-action my-2 flex justify-between">
              <Form method="post">
                <button
                  type="submit"
                  name="action"
                  value="clear"
                  className="btn btn-sm btn-secondary place-self-center"
                >
                  Clear
                </button>
              </Form>
              <label
                htmlFor="clearListModal"
                className="btn btn-sm btn-primary"
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="align-element card p-4 sm:p-8 bg-base-200 shadow-lg gap-y-4 mt-1 sm:grid sm:grid-cols-3 sm:gap-4">
        {tasks.map((task, idx) => {
          return <TaskCard key={task._id} task={task} idx={idx} />;
        })}
      </div>
    </section>
  );
};

export default TasksList;
