"use client";

import type React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import { URL_API } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [esperando, setEsperando] = useState(false);
    const [exito, setExito] = useState(false);
    const [error, setError] = useState("");
    const [usuario, setUsuario] = useState("");
    const [tiempoRestante, setTiempoRestante] = useState(0);
    const router = useRouter()
    useEffect(() => {
        // Check if user is already logged in
        const isLoggedIn = localStorage.getItem("user") ;
        if (isLoggedIn) {
            router.push('/')
           //window.location.href = "/";
        }
    }, []);



    const login = (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if (estaBloqueado()) return;
        setIsLoading(true);
        setError("");
        setExito(false);

        axios
            .post(`${URL_API}/api/v1/login`, {
                email: usuario,
                password,
            })
            .then((res) => {

                resetearIntentos();
                setExito(true);
                setIsLoading(false);
                setIsLoading(false);

                const token = res.data.access_token;
                localStorage.setItem("token", token);
                localStorage.setItem("token_type", res.data.token_type);
                toast.success(`Hola, ${res.data.data.name}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: "bg-green-500 text-white font-semibold",
                });

                // Redirige si quieres
                // window.location.href = "{{ route('home') }}"; // Cambia a la ruta que necesites


                // Check if onboarding is completed
                const onboardingCompleted =
                    localStorage.getItem("onboardingCompleted") === "true";

                if (!onboardingCompleted) {
                    window.location.href = "/onboarding"
                } else {
                     window.location.href = "/"
                }
            })
            .catch((err) => {
                setIsLoading(false);
                registrarIntentoFallido();
                console.error(err);
                toast.error(
                    `${
                        err.response?.status ===401?'Datos de acceso incorrectos': err.response?.data?.message || "Error al iniciar sesión"
                    }`,
                    {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        //className: "bg-green-500 text-white font-semibold",
                    }
                );
            });
    };
    const me = async ()  => {
              setIsLoading(true);
              setError("");
              setExito(false);

              const res = await axios
                  .get(`${URL_API}/api/v1/me`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
                    },
                  })
                  .then((res) => {
                      setExito(true);
                      setIsLoading(false);
                    setIsAuthenticated(true)
                      const data = res.data;
                      localStorage.setItem("user", JSON.stringify(data));
                      setUser(data);
                     /* toast.success(`Hola, ${res.data.name}`, {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          className: "bg-green-500 text-white font-semibold",
                      });*/


                  })
                  .catch((err) => {
                      setIsLoading(false);
                      setIsAuthenticated(false)
                      console.error(err);
                      toast.error(
                          `${
                              err.response?.status ===401?'Sesión expirada': err.response?.data?.message || "No se logró la acción"
                          }`,
                          {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: false,
                              progress: undefined,
                              theme: "light",
                              //className: "bg-green-500 text-white font-semibold",
                          }
                      );

                  });
          };
    const registrarIntentoFallido = () => {
        const intentos =
            parseInt(String(localStorage.getItem("failsAttemps"))) || 1;
        const nuevoTotal = intentos + 1;

        localStorage.setItem("failsAttemps", nuevoTotal.toString());

        if (nuevoTotal >= 3) {
            const desbloqueo = Date.now() + 5 * 60 * 1000; // 5 minutos
            localStorage.setItem("blockUntil", desbloqueo.toString());
            verificarBloqueo();
        }
    };
    const resetearIntentos = () => {
        localStorage.removeItem("failsAttemps");
        localStorage.removeItem("blockUntil");
    };
    const verificarBloqueo = () => {
        const desbloqueo = parseInt(String(localStorage.getItem("blockUntil")));
        const ahora = Date.now();

        if (desbloqueo && ahora < desbloqueo) {
            setEsperando(true);
            setTiempoRestante(Math.floor((desbloqueo - ahora) / 1000));
            const intervalo = setInterval(() => {
                setTiempoRestante((prev) => prev - 1);
                if (tiempoRestante <= 0) {
                    clearInterval(intervalo);
                    setEsperando(false);
                    resetearIntentos();
                }
            }, 1000);
        } else {
            resetearIntentos();
        }
    };
    const estaBloqueado = () => {
        if (esperando) {
            toast.warn(
                `Espere ${Math.floor(
                    tiempoRestante / 60
                )} minutos y ${
                    tiempoRestante % 60
                } segundos para volver a intentar`,
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: "bg-orange-500 text-white font-semibold",
                }
            );

            setIsLoading(false);
            return true;
        }
        setIsLoading(false);
        return false;
    };
    // Componente de partículas con movimiento real mejorado
    const ParticlesBackground = () => (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {/* Partículas grandes con movimiento complejo */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={`large-${i}`}
                    className="absolute w-3 h-3 bg-white/30 rounded-full moving-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `particleFloat ${
                            4 + Math.random() * 3
                        }s infinite linear`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}

            {/* Partículas medianas con movimiento inverso */}
            {[...Array(20)].map((_, i) => (
                <div
                    key={`medium-${i}`}
                    className="absolute w-2 h-2 bg-white/40 rounded-full moving-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `particleFloatReverse ${
                            3 + Math.random() * 4
                        }s infinite linear`,
                        animationDelay: `${Math.random() * 4}s`,
                    }}
                />
            ))}

            {/* Partículas pequeñas con movimiento lento */}
            {[...Array(25)].map((_, i) => (
                <div
                    key={`small-${i}`}
                    className="absolute w-1 h-1 bg-white/50 rounded-full moving-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `particleFloatSlow ${
                            5 + Math.random() * 3
                        }s infinite linear`,
                        animationDelay: `${Math.random() * 6}s`,
                    }}
                />
            ))}

            {/* Partículas brillantes con efecto pulsante */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={`bright-${i}`}
                    className="absolute w-1.5 h-1.5 bg-white/60 rounded-full moving-particle animate-pulse"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `particleFloat ${
                            2 + Math.random() * 2
                        }s infinite ease-in-out, pulse 2s infinite`,
                        animationDelay: `${Math.random() * 3}s`,
                        boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
                    }}
                />
            ))}
        </div>
    );

    // Agregar estilos globales para las partículas
    useEffect(() => {
        const style = document.createElement("style");
        style.textContent = `
    @keyframes particleFloat {
      0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      50% {
        transform: translate(50px, -30px) rotate(180deg) scale(1.2);
        opacity: 1;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        transform: translate(100px, -60px) rotate(360deg) scale(0.8);
        opacity: 0;
      }
    }

    @keyframes particleFloatReverse {
      0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      50% {
        transform: translate(-40px, 40px) rotate(-180deg) scale(1.1);
        opacity: 1;
      }
      90% {
        opacity: 0.4;
      }
      100% {
        transform: translate(-80px, 80px) rotate(-360deg) scale(0.9);
        opacity: 0;
      }
    }

    @keyframes particleFloatSlow {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      20% {
        opacity: 0.5;
      }
      80% {
        opacity: 0.8;
      }
      100% {
        transform: translate(30px, -100px) rotate(90deg);
        opacity: 0;
      }
    }

    .moving-particle {
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
  `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <ToastContainer />
            {isLoading && <Loading/>}
            <div className="min-h-screen flex flex-col lg:flex-row">
                {/* IZQUIERDA */}
                <div
                    className="w-full lg:w-1/2 flex flex-col justify-center px-10 py-12 text-white relative bg-gradient-to-br from-blue-600 to-indigo-700"
                    style={{
                        backgroundImage: `url('https://www.elpais.com.co/resizer/v2/IVU27MUVT5FBFLHJHPDYI3GLBA.jpg?auth=42fa6325a8c5021b5c96003ef3c6004daad18a0f6c50ad9c374cfece4190bbfc&smart=true&quality=75&width=1280&height=720')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <ParticlesBackground />
                    <div className="absolute inset-0 bg-indigo-900 bg-opacity-70 z-0"></div>

                    <div className="relative z-20 max-w-xl mx-auto text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                            <div className="bg-white bg-opacity-10 p-2 rounded-xl backdrop-blur-sm">
                                <img src="/icono.svg" className="w-8 h-8 text-white" alt="" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">
                                    Grancole Pro
                                </h1>
                                <p className="text-sm opacity-80">
                                    Sistema de Gestión Educativa
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-4">
                            Gestiona tu institución educativa de manera
                            inteligente
                        </h2>

                        <p className="text-sm opacity-90 mb-6">
                            Plataforma integral para administrar estudiantes,
                            profesores, calificaciones, asistencia y mucho más
                            en un solo lugar.
                        </p>

                        <ul className="space-y-3 text-sm mb-10">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                Gestión completa de estudiantes y profesores
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                Sistema de calificaciones y boletines
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                Control de asistencia en tiempo real
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                Comunicación integrada y foros
                            </li>
                        </ul>

                        <div className="flex justify-center lg:justify-start gap-10 text-white/90">
                            <div className="text-center lg:text-left">
                                <p className="text-2xl font-semibold">1,234+</p>
                                <p className="text-xs">Estudiantes</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-2xl font-semibold">45+</p>
                                <p className="text-xs">Cursos</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-2xl font-semibold">98%</p>
                                <p className="text-xs">Certificaciones</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DERECHA / FORMULARIO */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-blue-100">
                    <img
                        src="https://colmac.edu.co/wp-content/uploads/escudo.jpg"
                        alt="Escudo Colegio"
                        className="w-24 h-24 object-cover mb-6 rounded-full shadow-lg ring-4 ring-white/50"
                    />

                    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                        Bienvenido a GranCole
                    </h2>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                        Inicia sesión para continuar
                    </p>

                    <Card className="w-full max-w-md bg-white shadow-md border-0">
                        <CardHeader className="space-y-1 pb-4">
                            <CardTitle className="text-2xl font-semibold text-gray-800">
                                Iniciar Sesión
                            </CardTitle>
                            <CardDescription className="text-gray-500">
                                Ingresa tus credenciales para acceder al sistema
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={login} className="space-y-4">
                                {/* Campo Usuario */}
                                <div className="space-y-1">
                                    <Label
                                        htmlFor="usuario"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Usuario
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            id="usuario"
                                            type="text"
                                            placeholder="0000000"
                                            value={usuario}
                                            onChange={(e) =>
                                                setUsuario(e.target.value)
                                            }
                                            className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Campo Contraseña */}
                                <div className="space-y-1">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Contraseña
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="pl-10 pr-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Olvidaste contraseña */}
                                <div className="flex items-center justify-between text-sm">
                                    <span></span>
                                    <Button
                                        variant="link"
                                        className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Button>
                                </div>

                                {/* Botón Login */}
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 transition-all duration-200"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Iniciando sesión...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            Iniciar Sesión
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </Button>
                            </form>

                            {/* Footer del formulario */}
                            <div className="mt-6 text-xs text-center text-gray-500">
                                <p>
                                    ¿No tienes cuenta?{" "}
                                    <Button
                                        variant="link"
                                        className="text-blue-600 hover:text-blue-800 p-0 h-auto text-xs"
                                    >
                                        Contacta al administrador
                                    </Button>
                                </p>
                                <p className="mt-2">
                                    © 2025 GranCole Pro. Todos los derechos
                                    reservados.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="text-center text-sm text-gray-500 py-4 bg-gray-100">
                © 2025 Grancole Pro. Todos los derechos reservados. Diseñado por
                Agencia Cristal.
            </footer>
        </div>
    );
}
