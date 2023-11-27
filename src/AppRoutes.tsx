import { Navigate, Route } from "react-router-dom";

import RegisterUserPage from "./components/pages/auth/register-user/RegisterUser";
import RegisterEmployerPage from "./components/pages/auth/register-employer/RegisterEmployer";
import RegisterServiceProvider from "./components/pages/auth/register-service-provider/RegisterServiceProvider";
import PrivateRoutes from "./components/molecules/private-routes/PrivateRoutes";
import HomeUser from "./components/pages/user/home-user/HomeUser";
import AuthLayout from "./components/layout/auth-layout/AuthLayout";
import HomeLayout from "./components/layout/home-layout/HomeLayout";
import Timeline from "./components/pages/service-provider/timeline/Timeline";
import Events from "./components/pages/service-provider/events/Events";
import Inbox from "./components/pages/common/chat/inbox/Inbox";
import Messaging from "./components/pages/common/chat/messaging/Messaging";
import LoginUser from "./components/pages/auth/login-user/LoginUser";
import LoginProvider from "./components/pages/auth/login-provider/LoginProvider";
import ServiceProviderProfile from "./components/pages/service-provider/profile/ServiceProviderProfile";
import Payment from "./components/pages/common/payment/Payment";
import Landing from "./components/pages/common/landing/Landing";

export const AppRoutes = () => (
  <>
    <Route path="/" element={<AuthLayout />}>
      <Route path="/" element={<Landing />} />
      <Route path="register" element={<RegisterUserPage />} />
      <Route path="login-user" element={<LoginUser />} />
      <Route path="login-provider" element={<LoginProvider />} />
      <Route path="register/user" element={<RegisterEmployerPage />} />
      <Route
        path="register/service-provider"
        element={<RegisterServiceProvider />}
      />
    </Route>
    <Route path="/" element={<HomeLayout />}>
      <Route element={<PrivateRoutes />}>
        <Route path="home" element={<HomeUser />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="events" element={<Events />} />
        <Route
          path="service-provider-profile"
          element={<ServiceProviderProfile />}
        />
        <Route path="payment" element={<Payment />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="/inbox/messaging/:roomid" element={<Messaging />} />
      </Route>
    </Route>
  </>
);
