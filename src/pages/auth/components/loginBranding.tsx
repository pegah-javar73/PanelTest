import React from 'react';

const LoginBranding: React.FC = () => {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-200 p-8 lg:p-12 flex-col justify-center items-center text-center">
        <h3 className="text-4xl lg:text-5xl font-bold text-gray-800">
          پنل مدیریت
        </h3>
      </div>
      
      {/* Mobile Version - Simple Text at Top */}
      <div className="lg:hidden w-full bg-gray-200 py-4 px-6 text-center">
        <h3 className="text-xl font-bold text-gray-800">
          پنل مدیریت
        </h3>
      </div>
    </>
  );
};

export default LoginBranding;
