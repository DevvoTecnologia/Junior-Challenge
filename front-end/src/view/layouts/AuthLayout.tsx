import { Outlet } from 'react-router-dom';
import illustration from '@/assets/illustration.jpg';

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
        <div className="w-full h-full max-w-[504px] flex justify-center items-center p-8">
          <Outlet />
        </div>
      </div>

      <div className="hidden w-1/2 h-full lg:flex justify-center items-center">
        <img
          src={illustration}
          alt="illustration"
          className="object-cover w-full h-full border-l-4 border-[#1c121f]"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
