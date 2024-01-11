import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer
      position="bottom-center"
      transition={Zoom}
      autoClose={4000}
      draggable={false}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      newestOnTop
    />
  </>
);
