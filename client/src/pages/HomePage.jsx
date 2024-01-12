import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import customFetch from "../utils/customFetch";
import { Loading } from "../components";

// React Query object to fetch current user
const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch("/user/current-user");
    return data;
  },
};

// React Router loader to load current user at home page use and caching using React Query
export const homePageLoader = (queryClient) => async () => {
  try {
    const userData = await queryClient.ensureQueryData(userQuery);
    return null;
  } catch (error) {
    return error;
  }
};

const HomePage = ({ queryClient }) => {
  // always check the login state and get current user details
  const user = useQuery(userQuery)?.data;

  // useNavigate hook to navigate pages
  const navigate = useNavigate();

  // useNavigation hook to display the loading animation when navigating pages
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // logout function
  const logout = async () => {
    navigate("/");
    await customFetch.post("/auth/logout");
    queryClient.resetQueries();
    toast.success("Logged Out");
  };

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <section className=" py-4 sm:py-10">
        {/* display loading animation or pages based on router state */}
        {isLoading ? <Loading /> : <Outlet context={user} />}
      </section>
    </div>
  );
};

export default HomePage;
