import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
      <div className='bg-gradient-to-r from-light-blue to-deep-blue min-h-screen flex justify-center items-center py-20 px-28'>
        <Outlet />
      </div>
  );
}
