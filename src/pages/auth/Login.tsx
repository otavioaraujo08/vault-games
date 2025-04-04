import { GalleryVerticalEnd } from 'lucide-react';
import { useNavigate } from 'react-router';
import './index.css';
import { LoginForm } from './LoginForm';

export const Login = () => {
  const redirect = useNavigate();
  const redirectToHome = () => {
    redirect('/');
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div
          className="flex justify-center gap-2 cursor-pointer md:justify-start dark:text-black"
          onClick={redirectToHome}
        >
          <a className="flex items-center gap-2 font-medium dark:text-black">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Vault Games
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/loginWallpaper.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};
