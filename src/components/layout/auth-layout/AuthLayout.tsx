import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      AuthLayout
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
