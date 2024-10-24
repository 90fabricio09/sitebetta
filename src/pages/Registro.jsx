import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase.jsx"; // Inclua o Firestore
import { doc, setDoc } from "firebase/firestore"; // Para salvar no Firestore

const Registro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Para exibir/ocultar a senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Para exibir/ocultar a confirmação da senha
  const [message, setMessage] = useState(""); // Para mensagens de sucesso ou erro
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Enviar email de verificação
      await sendEmailVerification(user);
      setMessage("Cadastrado com sucesso! Verifique seu email para ativar sua conta.");

      // Salvar dados do usuário no Firestore com o campo "verificado" como false
      await setDoc(doc(db, "users", user.uid), {
        firstName: name,
        email: user.email,
        verified: false, // Marcando como não verificado
      });

      // Deslogar o usuário imediatamente após o registro
      await signOut(auth);

      // Redireciona para a página de login após 5 segundos
      setTimeout(() => {
        navigate("/login");
      }, 5000);

    } catch (e) {
      // Tratamento personalizado para diferentes erros
      if (e.code === "auth/email-already-in-use") {
        setError("O email já está em uso. Tente outro.");
      } else if (e.code === "auth/invalid-email") {
        setError("Insira um email válido."); // Mensagem personalizada para email inválido
      } else {
        setError("Erro ao registrar: " + e.message);
      }
    }
  };

  // Função para exibir/ocultar senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para exibir/ocultar confirmação de senha
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Registro</h1>
        <label htmlFor="">Nome:</label>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">E-mail:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Senha:</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <label htmlFor="">Confirmar Senha:</label>
        <div className="password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i
            className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
            onClick={toggleConfirmPasswordVisibility}
          ></i>
        </div>
        <button type="button" onClick={handleRegister}>
          Registrar
        </button>
        {message && <p style={{ color: "green" }}>{message}</p>} {/* Mensagem de sucesso */}
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Mensagem de erro */}
        <p className="not-account">
          Já possui uma conta?{" "}
          <span className="not-account">
            <a href="/login">Entre agora!</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registro;