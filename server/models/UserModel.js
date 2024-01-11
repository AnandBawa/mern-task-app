import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    tasks: {
      type: [
        {
          title: String,
          description: String,
          completed: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserModel);
