import { Outlet, useNavigate, useNavigation, Navigate } from "react-router-dom";
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

export const homePageLoader = (queryClient) => async () => {
  try {
    const userData = await queryClient.ensureQueryData(userQuery);
    return null;
  } catch (error) {
    return error;
  }
};

const HomePage = ({ queryClient }) => {
  const user = useQuery(userQuery)?.data;

  const navigate = useNavigate();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

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
        {isLoading ? <Loading /> : <Outlet context={user} />}
      </section>
    </div>
  );
};

export default HomePage;
