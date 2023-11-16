import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      HomeLayout
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
