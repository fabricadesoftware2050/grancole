"use client"

import { useState, useEffect } from "react"
import {
  Users,
  GraduationCap,
  BarChart3,
  Bell,
  Settings,
  Search,
  TrendingUp,
  UserCheck,
  FileText,
  UserPlus,
  Activity,
  Target,
  BookMarked,
  Users2,
  Award,
  LogOut,
  Calendar,
  MessageSquare,
  Zap,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Save,
  PieChart,
  LineChart,
  Menu,
  ChevronDown,
  Home,
  ClipboardList,
  BookOpen,
  UserCog,
  Megaphone,
  Cog,
  Building,
  LucideBookUser,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import Link from "next/link";
import axios from "axios"
import { URL_API } from "@/lib/utils"
import Loading from "./loading"
import { jwtDecode } from "jwt-decode";

const TopMenu = () => {
    const [mounted, setMounted] = useState(false);

      const [activeTab, setActiveTab] = useState("home")
      const [isAuthenticated, setIsAuthenticated] = useState(false)
      const [isModalOpen, setIsModalOpen] = useState(false)
      const [editingItem, setEditingItem] = useState(null)
      const [searchTerm, setSearchTerm] = useState("")
      const [formData, setFormData] = useState({})
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
      const [isLoading, setIsLoading] = useState(false)
      const [exito, setExito] = useState(false)
      const [error, setError] = useState()
      const [user, setUser] = useState()
    // Funciones para acciones rápidas


    // Estructura del menú horizontal con submenús
      const menuStructure = [
        {
          id: "personas",
          label: "Personas",
          icon: Users,
          gradient: "from-emerald-500 to-teal-600",
          items: [
            { id: "estudiantes", label: "Estudiantes", icon: Users, description: "Gestión de estudiantes" },
            { id: "teachers", label: "Profesores", icon: GraduationCap, description: "Gestión de profesores" },
            { id: "matriculas", label: "Matrículas", icon: UserPlus, description: "Proceso de matrículas" },
          ],
        },
        {
          id: "academico",
          label: "Académico",
          icon: BookOpen,
          gradient: "from-purple-500 to-violet-600",
          items: [
            {
                id: "actividades",
                label: "Actividades",
                icon: Activity,
                description: "Actividades escolares",
                // Agregamos subitems aquí
                subitems: [
                    { id: "foros", label: "Foros", icon: Users2, description: "Foros de discusión" },
                    { id: "tareas", label: "Tareas", icon: ClipboardList, description: "Gestión de tareas" },
                    { id: "examenes", label: "Exámenes", icon: FileText, description: "Gestión de exámenes" },
                    { id: "anuncios", label: "Anuncios", icon: Megaphone, description: "Anuncios generales" },
                ]
            },
            ,
            { id: "examenes", label: "Exámenes", icon: FileText, description: "Gestión de exámenes" },
            { id: "desempeno", label: "Desempeño", icon: Target, description: "Análisis de desempeño" },
            { id: "boletines", label: "Boletines", icon: Award, description: "Boletines y calificaciones" },
            { id: "asistencia", label: "Asistencia", icon: UserCheck, description: "Control de asistencia" },
            { id: "materiales", label: "Materiales", icon: BookMarked, description: "Material de clase" },
            // { id: "foros", label: "Foros", icon: Users2, description: "Foros de discusión" }, // Ya está en subitems
            { id: "mensajes", label: "Mensajes", icon: Mail, description: "Sistema de mensajería" },
            // { id: "anuncios", label: "Anuncios", icon: Megaphone, description: "Anuncios generales" }, // Ya está en subitems
            //{ id: "notificaciones", label: "Notificaciones", icon: Bell, description: "Centro de notificaciones" },
          ],
        },
        {
          id: "configuracion",
          label: "Configuración",
          icon: Settings,
          gradient: "from-gray-500 to-slate-600",
          admin: true,
          items: [
            { id: "institucion", label: "Institución", icon: Building, description: "Información Básica de la Institución",admin: true },
            { id: "asignaturas", label: "Áreas y Asignaturas", icon: LucideBookUser, description: "Gestión de áreas y asignaturas",admin: true },
            { id: "curriculos", label: "Currículo", icon: LucideBookUser, description: "Malla Curricular y Plan de Área",admin: true },
            { id: "usuarios", label: "Usuarios", icon: UserCog, description: "Gestión de usuarios", admin: true },
            { id: "sistema", label: "Sistema", icon: Settings, description: "Configuración del sistema" ,admin: true},
          ],
        },
      ]

      const handleLogout = () => {
        setIsLoading(true);
    axios
              .get(`${URL_API}/api/v1/logout`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                  setExito(true);
                  setIsLoading(false);

              })
              .catch((err) => {
                  setIsLoading(false);
                  toast.error(
                      `${
                          err.response?.status ===401?'Sesión expirada': err.response?.data?.message || "Error al cerrar sesión"
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

              })
              .finally(() => {

                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("token_type");
                //localStorage.clear()
                window.location.href = "/login"
              });
  }

  useEffect(()=>{
    try{
        const decoded = jwtDecode(localStorage.getItem('token'));
        setUser(decoded)

    }catch(e){
        console.log(e)
    }
  },[])
return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 backdrop-blur-md shadow-lg border-b border-blue-800 sticky top-0 z-50">
        {isLoading && <Loading />}
        <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between h-16">
                {/* Logo y Brand */}
                <Link href={"/"} className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                                <img src="./icono.svg" className="w-6 h-6 text-white" alt="" />
                            </div>
                            <div className="hidden md:block">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                    GranCole Pro
                                </h1>
                                <p className="text-xs text-blue-100">Plataforma de Apoyo a la Formación</p>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Navigation Menu - Desktop */}
                <nav className="hidden lg:flex items-center space-x-1">
                    {/* Menu Inicio */}
                    <Link
                        href="/"
                        className={`transition-all duration-300 rounded-md px-3 py-2 flex items-center ${
                            activeTab === "home"
                                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
                                : "text-blue-100 hover:bg-blue-800/60"
                        }`}
                        onClick={() => setActiveTab("home")}
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Inicio
                    </Link>
                    {menuStructure.map((menu) => (
                        <div key={menu.id}>
                            {menu.items.length === 0 ? (
                                <Link
                                    href={`/`}
                                    variant={activeTab === menu.id ? "default" : "ghost"}
                                    className={`transition-all duration-300 rounded-md px-3 py-2 ${
                                        activeTab === menu.id
                                            ? `bg-gradient-to-r ${menu.gradient} text-white shadow-lg`
                                            : "text-blue-100 hover:bg-blue-800/60"
                                    }`}
                                >
                                    <menu.icon className="w-4 h-4 mr-2" />
                                    {menu.label}
                                </Link>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="text-blue-100 hover:bg-blue-800/60 transition-all duration-300 rounded-md px-3 py-2">
                                            <menu.icon className="w-4 h-4 mr-2" />
                                            {menu.label}
                                            <ChevronDown className="w-3 h-3 ml-1" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-md shadow-xl border-0">
                                        <DropdownMenuLabel className="text-gray-900 font-semibold">{menu.label}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {menu.items.map((item) => {
                                            // Si el menú es "Actividades", agregamos las opciones adicionales
                                            if (menu.id === "academico" && item.id === "actividades") {
                                                return (
                                                    <div key={item.id}>
                                                        <Link
                                                            href={`/${item.id}`}
                                                            className={`cursor-pointer transition-all duration-200 flex items-center gap-3 p-2 hover:bg-blue-50 rounded ${
                                                                activeTab === item.id
                                                                    ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
                                                                    : "hover:bg-blue-50"
                                                            }`}
                                                        >
                                                            <item.icon className="w-4 h-4 mr-3 text-blue-700" />
                                                            <div>
                                                                <div className="font-medium">{item.label}</div>
                                                                <div className="text-xs text-gray-500">{item.description}</div>
                                                            </div>
                                                        </Link>
                                                        {/* Opciones adicionales para Actividades */}
                                                        <Link
                                                            href="/foros"
                                                            className={`cursor-pointer transition-all duration-200 flex items-center gap-3 p-2 hover:bg-blue-50 rounded ${
                                                                activeTab === "foros"
                                                                    ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
                                                                    : "hover:bg-blue-50"
                                                            }`}
                                                        >
                                                            <Users2 className="w-4 h-4 mr-3 text-blue-700" />
                                                            <div>
                                                                <div className="font-medium">Foros</div>
                                                                <div className="text-xs text-gray-500">Foros de discusión</div>
                                                            </div>
                                                        </Link>
                                                        <Link
                                                            href="/tareas"
                                                            className={`cursor-pointer transition-all duration-200 flex items-center gap-3 p-2 hover:bg-blue-50 rounded ${
                                                                activeTab === "tareas"
                                                                    ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
                                                                    : "hover:bg-blue-50"
                                                            }`}
                                                        >
                                                            <ClipboardList className="w-4 h-4 mr-3 text-blue-700" />
                                                            <div>
                                                                <div className="font-medium">Tareas</div>
                                                                <div className="text-xs text-gray-500">Gestión de tareas</div>
                                                            </div>
                                                        </Link>
                                                        <Link
                                                            href="/examenes"
                                                            className={`cursor-pointer transition-all duration-200 flex items-center gap-3 p-2 hover:bg-blue-50 rounded ${
                                                                activeTab === "examenes"
                                                                    ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
                                                                    : "hover:bg-blue-50"
                                                            }`}
                                                        >
                                                            <FileText className="w-4 h-4 mr-3 text-blue-700" />
                                                            <div>
                                                                <div className="font-medium">Exámenes</div>
                                                                <div className="text-xs text-gray-500">Gestión de exámenes</div>
                                                            </div>
                                                        </Link>
                                                        <Link
                                                            href="/anuncios"
                                                            className={`cursor-pointer transition-all duration-200 flex items-center gap-3 p-2 hover:bg-blue-50 rounded ${
                                                                activeTab === "anuncios"
                                                                    ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
                                                                    : "hover:bg-blue-50"
                                                            }`}
                                                        >
                                                            <Megaphone className="w-4 h-4 mr-3 text-blue-700" />
                                                            <div>
                                                                <div className="font-medium">Anuncios</div>
                                                                <div className="text-xs text-gray-500">Anuncios generales</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            }
                                            // Por defecto, renderiza el item normal
                                            return (
                                                <Link
                                                    href={`/${item.id}`}
                                                    key={item.id}
                                                    className={`cursor-pointer transition-all duration-200 flex items-center gap-3 p-2 hover:bg-blue-50 rounded ${
                                                        activeTab === item.id
                                                            ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
                                                            : "hover:bg-blue-50"
                                                    }`}
                                                >
                                                    <item.icon className="w-4 h-4 mr-3 text-blue-700" />
                                                    <div>
                                                        <div className="font-medium">{item.label}</div>
                                                        <div className="text-xs text-gray-500">{item.description}</div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Mensajes */}
                    <div className="relative">
                        <Button
                            variant="outline"
                            size="icon"
                            className="bg-blue-800/60 border-blue-700 hover:bg-blue-700/80"
                        >
                            <Mail className="w-4 h-4 text-blue-200" />
                            {/* Burbuja de mensajes sin leer */}
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold border-2 border-blue-800">
                                5
                            </span>
                        </Button>
                    </div>

                    {/* Notifications */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-blue-800/60 border-blue-700 hover:bg-blue-700/80"
                    >
                        <Bell className="w-4 h-4 text-blue-200" />
                    </Button>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10 ring-2 ring-blue-400 hover:ring-blue-500 transition-all">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
                                        AD
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-md" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{user?.role}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50">
                                <Settings className="mr-2 h-4 w-4 text-blue-600" />
                                <span>Configuración</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50"
                            >
                                <LogOut className="mr-2 h-4 w-4 text-red-600" />
                                <span>Cerrar Sesión</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-blue-100"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-blue-800 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 backdrop-blur-md">
                <div className="px-4 py-4 space-y-2">
                    {/* Menu Inicio en mobile */}
                    <Button
                        variant={activeTab === "home" ? "default" : "ghost"}
                        className={`w-full justify-start flex items-center ${
                            activeTab === "home" ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white" : "text-blue-100"
                        }`}
                        onClick={() => {
                            setActiveTab("home")
                            setIsMobileMenuOpen(false)
                        }}
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Inicio
                    </Button>
                    {menuStructure.map((menu) => (
                        <div key={menu.id}>
                            {menu.items.length === 0 ? (
                                <Button
                                    variant={activeTab === menu.id ? "default" : "ghost"}
                                    className={`w-full justify-start ${
                                        activeTab === menu.id ? `bg-gradient-to-r ${menu.gradient} text-white` : "text-blue-100"
                                    }`}
                                    onClick={() => {
                                        setActiveTab(menu.id)
                                        setIsMobileMenuOpen(false)
                                    }}
                                >
                                    <menu.icon className="w-4 h-4 mr-2" />
                                    {menu.label}
                                </Button>
                            ) : (
                                <div className="space-y-1">
                                    <div className="px-3 py-2 text-sm font-medium text-blue-100 bg-blue-800 rounded flex items-center">
                                        <menu.icon className="w-4 h-4 mr-2 inline" />
                                        {menu.label}
                                    </div>
                                    {menu.items.map((item) => {
                                        if (menu.id === "academico" && item.id === "actividades") {
                                            return (
                                                <div key={item.id}>
                                                    <Button
                                                        variant="ghost"
                                                        className={`w-full justify-start pl-8 ${
                                                            activeTab === item.id ? "bg-blue-700 text-white" : "text-blue-200"
                                                        }`}
                                                        onClick={() => {
                                                            setActiveTab(item.id)
                                                            setIsMobileMenuOpen(false)
                                                        }}
                                                    >
                                                        <item.icon className="w-4 h-4 mr-2" />
                                                        {item.label}
                                                    </Button>
                                                    {/* Opciones adicionales para Actividades en mobile */}
                                                    <Button
                                                        variant="ghost"
                                                        className={`w-full justify-start pl-12 ${
                                                            activeTab === "foros" ? "bg-blue-700 text-white" : "text-blue-200"
                                                        }`}
                                                        onClick={() => {
                                                            setActiveTab("foros")
                                                            setIsMobileMenuOpen(false)
                                                        }}
                                                    >
                                                        <Users2 className="w-4 h-4 mr-2" />
                                                        Foros
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className={`w-full justify-start pl-12 ${
                                                            activeTab === "tareas" ? "bg-blue-700 text-white" : "text-blue-200"
                                                        }`}
                                                        onClick={() => {
                                                            setActiveTab("tareas")
                                                            setIsMobileMenuOpen(false)
                                                        }}
                                                    >
                                                        <ClipboardList className="w-4 h-4 mr-2" />
                                                        Tareas
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className={`w-full justify-start pl-12 ${
                                                            activeTab === "examenes" ? "bg-blue-700 text-white" : "text-blue-200"
                                                        }`}
                                                        onClick={() => {
                                                            setActiveTab("examenes")
                                                            setIsMobileMenuOpen(false)
                                                        }}
                                                    >
                                                        <FileText className="w-4 h-4 mr-2" />
                                                        Exámenes
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className={`w-full justify-start pl-12 ${
                                                            activeTab === "anuncios" ? "bg-blue-700 text-white" : "text-blue-200"
                                                        }`}
                                                        onClick={() => {
                                                            setActiveTab("anuncios")
                                                            setIsMobileMenuOpen(false)
                                                        }}
                                                    >
                                                        <Megaphone className="w-4 h-4 mr-2" />
                                                        Anuncios
                                                    </Button>
                                                </div>
                                            )
                                        }
                                        return (
                                            <Button
                                                key={item.id}
                                                variant="ghost"
                                                className={`w-full justify-start pl-8 ${
                                                    activeTab === item.id ? "bg-blue-700 text-white" : "text-blue-200"
                                                }`}
                                                onClick={() => {
                                                    setActiveTab(item.id)
                                                    setIsMobileMenuOpen(false)
                                                }}
                                            >
                                                <item.icon className="w-4 h-4 mr-2" />
                                                {item.label}
                                            </Button>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )}
    </header>
)
}

export default TopMenu
