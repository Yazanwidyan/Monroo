import { Route } from 'react-router-dom';

import RegisterUserPage from './components/pages/auth/register-user/RegisterUser';
import RegisterEmployerPage from './components/pages/auth/register-employer/RegisterEmployer';
// import RegisterServiceProvider from './components/pages/auth/register-service-provider/RegisterServiceProvider';
import PrivateRoutes from './components/molecules/private-routes/PrivateRoutes';
import HomeUser from './components/pages/user/home-user/HomeUser';
import AuthLayout from './components/layout/auth-layout/AuthLayout';
import HomeLayout from './components/layout/home-layout/HomeLayout';
import Timeline from './components/pages/service-provider/timeline/Timeline';
import Events from './components/pages/service-provider/events/Events';
import Inbox from './components/pages/common/chat/inbox/Inbox';
import ServiceProviderProfile from './components/pages/service-provider/profile/ServiceProviderProfile';
import Payment from './components/pages/common/payment/Payment';
import Landing from './components/pages/common/landing/Landing';
import HowItWorks from './components/pages/common/how-it-works/HowItWorks';
import ServiceProviderProfileView from './components/pages/user/service-provider-profile-view/ServiceProviderProfileView';
import AuthRoutes from './components/molecules/auth-routes/AuthRoutes';
import UserProfile from './components/pages/user/user-profile/UserProfile';
import UserBooking from './components/pages/user/user-booking/UserBooking';
import EasyRegisterUserPage from './components/pages/auth/easy-register-user/EasyRegisterUser';
import EasyRegisterProviderPage from './components/pages/auth/easy-register-provider/EasyRegisterProvider';
import MainEasyRegisterProviderPage from './components/pages/auth/main-easy-register-provider/MainEasyRegisterProvider';

export const AppRoutes = () => (
    <>
        <Route element={<AuthRoutes />}>
            <Route path="/" element={<AuthLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="register" element={<RegisterUserPage />} />
                <Route path="register/user" element={<RegisterEmployerPage />} />
                <Route path="register/service-provider" element={<MainEasyRegisterProviderPage />} />
            </Route>
            <Route>
                <Route path="user-register" element={<EasyRegisterUserPage />} />
                <Route path="provider-register" element={<EasyRegisterProviderPage />} />
            </Route>
        </Route>
        <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomeLayout />}>
                <Route path="home" element={<HomeUser />} />
                <Route path="timeline" element={<Timeline />} />
                <Route path="events" element={<Events />} />
                <Route path="user-booking" element={<UserBooking />} />
                <Route path="user-profile" element={<UserProfile />} />
                <Route path="service-provider-profile" element={<ServiceProviderProfile />} />
                <Route path="payment" element={<Payment />} />
                <Route path="inbox" element={<Inbox />} />
                <Route path="service-provider-profile-view/:providerID" element={<ServiceProviderProfileView />} />
            </Route>
        </Route>
    </>
);
