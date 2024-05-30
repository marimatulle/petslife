import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase";
import {
  setDoc,
  doc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

import { ReactComponent as RegularUserSVG } from "../assets/pet-owners.svg";
import { ReactComponent as VeterinarianSVG } from "../assets/vet.svg";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [fullName, setFullName] = useState("");
  const [crmv, setCrmv] = useState("");
  const [userType, setUserType] = useState("");
  const [showButtons, setShowButtons] = useState(true);

  const usernameExists = async (username) => {
    const regularUsersQuery = query(
      collection(database, "RegularUsers"),
      where("username", "==", username)
    );
    const veterinariansQuery = query(
      collection(database, "Veterinarians"),
      where("username", "==", username)
    );

    const [regularUsersSnapshot, veterinariansSnapshot] = await Promise.all([
      getDocs(regularUsersQuery),
      getDocs(veterinariansQuery),
    ]);

    return !regularUsersSnapshot.empty || !veterinariansSnapshot.empty;
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("A senha deve ter no mínimo 6 caracteres!");
    } else {
      setPasswordError("");
    }
  };

  const validateUsername = async (username) => {
    if (await usernameExists(username)) {
      setUsernameError("Nome de usuário já existente!");
    } else {
      setUsernameError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    validatePassword(password);
    await validateUsername(username);
    if (passwordError || usernameError) {
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(
          database,
          userType === "veterinario" ? "Veterinarians" : "RegularUsers",
          user.uid
        );
        const userData = {
          email: user.email,
          name: fullName,
          username: username,
        };
        if (userType === "veterinario") {
          userData.crmv = crmv;
        }
        await setDoc(userDocRef, userData);
        if (userType === "veterinario") {
        }
        navigate("/login");
      }
      toast.success("Cadastrado com sucesso!", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setShowButtons(false);
  };

  const renderForm = () => {
    if (userType === "veterinario") {
      return (
        <div>
          <label className="text-lg font-medium">CRMV:</label>
          <span className="text-xs font-bold ml-1 text-gray-400">
            UF-00000
          </span>
          <InputMask
            mask="aa-99999"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Digite seu CRMV"
            onChange={(e) => setCrmv(e.target.value)}
            required
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      {showButtons && (
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleUserTypeChange("veterinario")}
            className="bg-orange-300 text-white hover:bg-orange-400 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-4 px-6 rounded-xl text-xl font-bold mb-4 w-[200px]"
          >
            Sou Veterinário
          </button>
          <button
            onClick={() => handleUserTypeChange("tutor")}
            className="bg-orange-300 text-white hover:bg-orange-400 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-4 px-6 rounded-xl text-xl font-bold w-[200px]"
          >
            Sou Tutor
          </button>
        </div>
      )}
      {userType && (
        <div className="hidden relative lg:flex min-h-screen w-1/2 items-center justify-center">
          {userType === "veterinario" ? (
            <VeterinarianSVG alt="Imagem de um veterinário cuidando de um cachorro" />
          ) : (
            <RegularUserSVG alt="Imagem de uma família passeando com seu cachorro" />
          )}
        </div>
      )}
      {userType && (
        <div className="w-full flex items-center justify-center lg:w-1/2">
          <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
            <h1 className="text-5xl font-semibold">Cadastre-se!</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              Preencha o formulário abaixo para se cadastrar no Petslife.
            </p>
            <form onSubmit={handleRegister} className="mt-8">
              <div>
                <label className="text-lg font-medium">Nome completo:</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Digite seu nome completo"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-lg font-medium">Nome de usuário:</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Digite seu nome de usuário"
                  onChange={async (e) => {
                    setUsername(e.target.value);
                    await validateUsername(e.target.value);
                  }}
                  required
                />
                {usernameError && (
                  <p className="text-red-500">{usernameError}</p>
                )}
              </div>
              <div>
                <label className="text-lg font-medium">Email:</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Digite seu email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-lg font-medium">Senha:</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Digite sua senha"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  required
                />
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
              </div>
              {renderForm()}
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-orange-400 text-white text-lg font-bold"
                >
                  Cadastrar
                </button>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <p className="fonte-medium text-base">Já possui uma conta?</p>
                <Link
                  to="/login"
                  className="text-orange-400 text-base font-medium ml-2"
                >
                  Ir para login
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;