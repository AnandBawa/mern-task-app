import { Form, useNavigation, useSubmit } from "react-router-dom";

const TaskCard = ({ task, idx }) => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  let debounceTimer;
  const delaySubmit = (e) => {
    const form = e.currentTarget.form;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      submit(form, { method: "post" });
    }, 400);
  };

  return (
    <div
      className={`card bg-base-100 shadow-xl ${
        task.completed && "outline outline-success outline-2"
      }`}
    >
      <div className="card-body p-2 sm:p-4 gap-0 grid content-between">
        <Form>
          <input type="hidden" name="title" value={task.title} />
          <input type="hidden" name="completed" value={false} />
          <input type="hidden" name="description" value={task.description} />
          <input type="hidden" name="id" value={task._id} />
          <input type="hidden" name="action" value="update" />
          <div className="flex justify-between">
            <h2 className="card-title">
              <span className="text-primary">{idx + 1}.</span>
              {task.title}
            </h2>
            <input
              type="checkbox"
              disabled={isSubmitting}
              defaultChecked={task.completed}
              onChange={delaySubmit}
              name="completed"
              value={true}
              className={`checkbox checkbox-lg checkbox-accent ${
                task.completed && "checkbox-success"
              }`}
            />
          </div>
          <div className="divider my-0 py-0"></div>
          <p>{task.description}</p>
        </Form>
        <div className="card-actions mt-4 flex justify-between">
          <label
            disabled={isSubmitting}
            htmlFor={task._id}
            className="btn btn-sm btn-primary"
          >
            Edit
          </label>
          <input type="checkbox" id={task._id} className="modal-toggle" />
          <div className="modal px-1" role="dialog">
            <div className="modal-box px-3 py-2">
              <h3 className="font-bold text-lg">Edit Task</h3>
              <div className="divider my-0 py-0"></div>
              <Form method="post">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Title</span>
                  </div>
                  <input
                    required
                    type="text"
                    name="title"
                    minLength={3}
                    maxLength={15}
                    defaultValue={task.title}
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Description</span>
                  </div>
                  <textarea
                    required
                    name="description"
                    minLength={3}
                    maxLength={100}
                    defaultValue={task.description}
                    className="textarea textarea-bordered w-full"
                  />
                </label>
                <div className="flex flex-row justify-between mt-2">
                  <label htmlFor="" className="label label-text">
                    Completed?
                  </label>
                  <input type="hidden" name="completed" value={false} />
                  <input
                    type="checkbox"
                    name="completed"
                    id="completed"
                    defaultChecked={task.completed}
                    value={true}
                    className={`checkbox rounded-lg place-self-center checkbox-accent ${
                      task.completed && "checkbox-success"
                    }`}
                  />
                </div>
                <input type="hidden" name="id" value={task._id} />
                <div className="modal-action my-2 ">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    name="action"
                    value="update"
                    className="btn btn-primary btn-sm w-full"
                  >
                    {isSubmitting ? (
                      <>
                        Saving <span className="loading loading-dots"></span>
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <Form method="post">
            <input type="hidden" name="id" value={task._id} />
            <button
              type="submit"
              disabled={isSubmitting}
              name="action"
              value="delete"
              className="btn btn-sm btn-secondary"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
