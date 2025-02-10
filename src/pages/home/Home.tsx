import React, { useRef } from 'react';
import { useNavigate } from 'react-router';

export const Home = () => {
  const navigate = useNavigate();
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div ref={homeRef} className="flex flex-col items-center gap-8 h-full">
        <header className="w-[80%] min-h-[8vh] flex justify-between items-center p-4 mt-4">
          <div className="flex items-center">
            <h1 className="font-bebas tracking-wider text-xl text-zinc-900 lg:text-2xl">
              Vault Games
            </h1>
          </div>

          <div className="items-center hidden lg:flex">
            <ul className="flex gap-6">
              <li
                className="text-base lg:text-lg font-bold text-zinc-400 tracking-tight cursor-pointer hover:text-zinc-600 transition duration-300"
                onClick={() => scrollToSection(homeRef)}
              >
                Home
              </li>
              <li
                className="text-base lg:text-lg font-bold text-zinc-400 tracking-tight cursor-pointer hover:text-zinc-600 transition duration-300"
                onClick={() => scrollToSection(aboutRef)}
              >
                About
              </li>
              <li
                className="text-base lg:text-lg font-bold text-zinc-400 tracking-tight cursor-pointer hover:text-zinc-600 transition duration-300"
                onClick={() => scrollToSection(contactRef)}
              >
                Contact
              </li>
            </ul>
          </div>

          <div>
            <button
              className="w-[7rem] h-[2rem] lg:w-[8rem] lg:h-[2.5rem] bg-black text-white text-[0.8rem] lg:text-[1rem] rounded-3xl"
              onClick={redirectToLogin}
            >
              Login
            </button>
          </div>
        </header>
        <body className="flex flex-col justify-center items-center gap-2 min-h-[90vh]">
          <h1 className="max-w-[80rem] text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.8rem] font-bold text-center">
            Vault Games, o melhor site para gerenciar seus jogos com maestria
          </h1>
          <p className="max-w-[70rem] text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] text-zinc-500 text-center">
            Controle suas coleções, acompanhe seu progresso e descubra o que
            seus amigos estão jogando — tudo em um só lugar!
          </p>

          <button
            className="w-[8rem] h-[2.4rem] lg:w-[10rem] lg:h-[2.8rem] bg-black text-white text-[0.8rem] lg:text-[1rem] rounded-3xl mt-4"
            onClick={redirectToLogin}
          >
            Comece agora
          </button>
        </body>
      </div>

      <div
        ref={aboutRef}
        className="h-full min-h-screen flex flex-col bg-black"
      >
        About
      </div>
      <div
        ref={contactRef}
        className="h-full min-h-screen flex flex-col bg-white"
      >
        Contact
      </div>
    </div>
  );
};
