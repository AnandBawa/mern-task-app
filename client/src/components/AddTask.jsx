import { Form, useNavigation, useOutletContext } from "react-router-dom";

const AddTask = () => {
  const { tasks } = useOutletContext();
  const max = tasks?.length >= 30;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method="post"
      className="align-element card p-4 sm:p-8 bg-base-200 shadow-lg gap-y-1 py-2"
    >
      <h2 className="text-xl font-medium tracking-wider">Add a Task</h2>
      <div className="grid sm:grid-cols-3 join join-vertical sm:join-horizontal">
        <div className="sm:col-span-2 join-item join join-vertical">
          <input
            key={Math.random()}
            type="text"
            required
            minLength={3}
            maxLength={15}
            placeholder="Title"
            name="title"
            className="input input-bordered w-full join-item"
          />
          <textarea
            key={Math.random()}
            required
            minLength={3}
            maxLength={100}
            placeholder="Description"
            name="description"
            className=" textarea textarea-bordered w-full join-item"
          />
        </div>
        <input type="hidden" name="action" value="add" />
        <button
          type="submit"
          disabled={isSubmitting || max}
          className=" btn btn-primary sm:col-span-1 w-full h-full join-item text-base tracking-wider"
        >
          {max ? (
            "30 Tasks Max"
          ) : isSubmitting ? (
            <>
              Adding <span className="loading loading-dots"></span>
            </>
          ) : (
            "ADD"
          )}
        </button>
      </div>
    </Form>
  );
};

export default AddTask;
