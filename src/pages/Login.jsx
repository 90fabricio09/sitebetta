// src/pages/Login.jsx
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase.jsx"; // Certifique-se de que o caminho está correto

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Para exibir/ocultar a senha
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState(""); // Para mensagens de redefinição de senha
  const [showResetBox, setShowResetBox] = useState(false); // Para controlar a exibição da caixa de redefinição
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redireciona para o Dashboard após login bem-sucedido
    } catch (e) {
      if (
        e.code === "auth/user-not-found" || 
        e.code === "auth/wrong-password" ||
        e.code === "auth/invalid-email"
      ) {
        setError("Email ou senha incorretos.");
      } else {
        setError("Erro ao fazer login. Por favor, tente novamente.");
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setResetMessage("Por favor, insira seu email para redefinir a senha.");
      return;
    }
    
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Email de redefinição de senha enviado! Verifique sua caixa de entrada.");
      
      // Após 3 segundos, oculta a caixa de redefinição de senha
      setTimeout(() => {
        setShowResetBox(false);
        setResetMessage(""); // Limpa a mensagem após ocultar
      }, 3000);
      
    } catch (e) {
      setResetMessage("Erro ao enviar o email de redefinição. Por favor, tente novamente.");
    }
  };

  // Função para exibir/ocultar senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <label htmlFor="">E-mail:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="">Senha:</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} onClick={togglePasswordVisibility}></i>
        </div>
        {/* Caixa de redefinição de senha */}
        {showResetBox && (
          <div className="reset-password-container">
            <p>Insira seu email e clique em "Enviar"</p>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handlePasswordReset}>Enviar</button>
            {resetMessage && <p>{resetMessage}</p>} {/* Mensagem de redefinição */}
          </div>
        )}
        <a
          href="#"
          className="forgot-password"
          onClick={() => setShowResetBox(!showResetBox)}
        >
          Esqueceu sua senha?
        </a>
        <button type="button" onClick={handleLogin}>
          Sign In
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p className="not-account">
          Não possui conta?{" "}
          <span className="not-account">
            <a href="/registro">Crie agora!</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;