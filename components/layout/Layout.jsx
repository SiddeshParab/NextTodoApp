import React from 'react';
import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <div className='w-full flex flex-col gap-5 items-center justify-center'>
      <Header />
      <main className='max-w-2xl w-full flex items-center justify-center px-4 md:px-2'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
