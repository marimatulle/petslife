import React from "react";
import { ReactComponent as PetsSVG } from "../assets/cat-and-dog.svg";
import { ReactComponent as GmailSVG } from "../assets/gmail-google.svg";

const Login = () => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
          <h1 className="text-5xl font-semibold">Bem-vindo de volta!</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Digite seu email e senha para entrar no Petslife.
          </p>
          <div className="mt-8">
            <div>
              <label className="text-lg font-medium">Email:</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Digite seu email"
              />
            </div>
            <div>
              <label className="text-lg font-medium">Senha:</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Digite sua senha"
                type="password"
              />
            </div>
            <div className="mt-8 flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label className="ml-2 font-medium text-base" for="remember">
                  Lembre-se de mim
                </label>
              </div>
              <button className="font-medium text-base text-orange-400">
                Esqueci minha senha
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-orange-400 text-white text-lg font-bold">
                Entrar
              </button>
              <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl flex border-2 border-gray-100 items-center justify-center text-lg">
                <GmailSVG alt="Gmail logo" className="w-6 h-6 mr-2" />
                Entrar com Google
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="fonte-medium text-base">Ainda não tem uma conta?</p>
              <button className="text-orange-400 text-base font-medium ml-2">
                Cadastre-se
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative lg:flex min-h-screen w-1/2 items-center justify-cente">
        <PetsSVG
          alt="Imagem de um cachorro e um gato"
          className=""
        />
      </div>
    </div>
  );
};

export default Login;
