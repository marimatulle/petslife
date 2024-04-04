import React from 'react';
import { ReactComponent as AstromeowSVG } from '../assets/astromeow.svg';

const Login = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div>Login</div>
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
       
        <AstromeowSVG alt='Astromeow Image' />
        
      </div>
    </div>
  );
};

export default Login;