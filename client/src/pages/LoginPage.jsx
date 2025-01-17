import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim("")) {
      return toast.error("Email é obrigatório");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Formato de e-mail inválido");
    }
    if (!formData.password) {
      return toast.error("Senha é obrigatório");
    }
    if (formData.password.length < 8) {
      return toast.error("Senha deve conter ao menos 8 caracteres");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sucess = validateForm();

    if (sucess === true) {
      login(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* lado esquerdo */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className=" size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Criar Conta</h1>
              <p className="text-base-content/60">Crie já uma conta</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="">
              <label className="">
                <span className="label-text font-medium">Senha</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full px-10`}
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  {" "}
                  <Loader2 className="size-5 animate-spin" /> Carregando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <div className="flex justify-center gap-1">
            <p className="text-base-content/60">Ainda não tem uma conta?</p>
            <Link to="/signup" className="link link-primary">
              Cadastrar
            </Link>
          </div>
        </div>
      </div>

      {/* lado direito */}
      <AuthImagePattern
        title="Bem-Vindo de Volta"
        subtitle="Conecte-se com amigos, compartilhe momentos"
      />
    </div>
  );
}

export default LoginPage;
