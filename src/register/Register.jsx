import React from "react";
import { ReactComponent as VetUserSVG } from "../assets/vet.svg";
import { ReactComponent as CommonUserSVG } from "../assets/pet-owners.svg";

const Login = () => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="hidden relative lg:flex min-h-screen w-1/2 items-center justify-center bg-gray-200">
        <CommonUserSVG alt="Imagem de uma família passeando com seu pet" className="" />
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
          <h1 className="text-5xl font-semibold">Cadastre-se!</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Preencha o formulário abaixo para se cadastrar no Petslife.
          </p>
          <div className="mt-8">
            <div>
              <label className="text-lg font-medium">Nome completo:</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Digite seu nome completo"
              />
            </div>
            <div>
              <label className="text-lg font-medium">Nome de usuário:</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Digite seu nome de usuário"
              />
            </div>
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
            <div>
              <label className="text-lg font-medium">CRMV:</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Digite seu CRMV"
              />
            </div>

            <div className="mt-8 flex flex-col gap-y-4">
              <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-orange-400 text-white text-lg font-bold">
                Cadastrar
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="fonte-medium text-base">Já possui uma conta?</p>
              <button className="text-orange-400 text-base font-medium ml-2">
                Ir para login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
