import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div
      className="flex min-h-[100vh] w-full bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg")',
      }}
    >
      {/* Left side for large screens, full background for small screens */}
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-5xl font-extrabold tracking-tight">
           EVENT HUNT
          </h1>
        </div>
      </div>

      {/* Full-screen background content for small screens */}
      <div className="flex flex-1 items-center justify-center bg-background/70 lg:bg-transparent px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
