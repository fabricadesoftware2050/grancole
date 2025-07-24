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
import { Label } from "@/components/ui/label"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const handleQuickAction = (action) => {
    switch (action) {
      case "nuevo-estudiante":
        setActiveTab("estudiantes")
        setTimeout(() => handleCreate("estudiantes"), 100)
        break
      case "nuevo-profesor":
        setActiveTab("teachers")
        setTimeout(() => handleCreate("teacher"), 100)
        break
      case "crear-examen":
        setActiveTab("examenes")
        setTimeout(() => handleCreate("exam"), 100)
        break
      case "programar-clase":
        setActiveTab("actividades")
        setTimeout(() => handleCreate("activity"), 100)
        break
      case "enviar-mensaje":
        setActiveTab("foros")
        setTimeout(() => handleCreate("forum"), 100)
        break
      case "ver-reportes":
        setActiveTab("desempeno")
        break
      default:
        break
    }
  }

  // Funciones para manejar formularios y acciones rápidas
    const handleCreate = (type) => {
      setEditingItem(null)
      setFormData({})
      setIsModalOpen(true)
    }



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
            { id: "examenes", label: "Exámenes", icon: FileText, description: "Gestión de exámenes" },
            { id: "desempeno", label: "Desempeño", icon: Target, description: "Análisis de desempeño" },
            { id: "boletines", label: "Boletines", icon: Award, description: "Boletines y calificaciones" },
            { id: "asistencia", label: "Asistencia", icon: UserCheck, description: "Control de asistencia" },

            { id: "materiales", label: "Materiales", icon: BookMarked, description: "Material de clase" },
            { id: "actividades", label: "Actividades", icon: Activity, description: "Actividades escolares" },
            { id: "foros", label: "Foros", icon: Users2, description: "Foros de discusión" },

            { id: "mensajes", label: "Mensajes", icon: Mail, description: "Sistema de mensajería" },
            { id: "anuncios", label: "Anuncios", icon: Megaphone, description: "Anuncios generales" },
            //{ id: "notificaciones", label: "Notificaciones", icon: Bell, description: "Centro de notificaciones" },
          ],
        },
        {
          id: "configuracion",
          label: "Configuración",
          icon: Settings,
          gradient: "from-gray-500 to-slate-600",
          items: [
            { id: "institucion", label: "Establecimiento", icon: Cog, description: "Información Básica de la Institución" },
            { id: "usuarios", label: "Usuarios", icon: UserCog, description: "Gestión de usuarios" },
            { id: "sistema", label: "Sistema", icon: Settings, description: "Configuración del sistema" },
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
    const decoded = jwtDecode(localStorage.getItem('token'));
    setUser(decoded)
  },[])
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        {isLoading && <Loading/>}
            <div className="px-4 lg:px-6">
              <div className="flex items-center justify-between h-16">
                {/* Logo y Brand */}
               <Link href={"/"} className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <img src="./icono.svg" className="w-6 h-6 text-white" alt="" />
                    </div>
                    <div className="hidden md:block">
                      <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        GranCole Pro
                      </h1>
                      <p className="text-xs text-gray-500">Sistema Educativo</p>
                    </div>
                  </div>
                </div>
               </Link>

                {/* Navigation Menu - Desktop */}
                <nav className="hidden lg:flex items-center space-x-1">
                  {menuStructure.map((menu) => (
                    <div key={menu.id}>
                      {menu.items.length === 0 ? (
                        <Link
                          href={`/`}
                          variant={activeTab === menu.id ? "default" : "ghost"}
                          className={`transition-all duration-300 ${
                            activeTab === menu.id
                              ? `bg-gradient-to-r ${menu.gradient} text-white shadow-lg`
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                         // onClick={() => setActiveTab(menu.id)}
                        >
                          <menu.icon className="w-4 h-4 mr-2" />
                          {menu.label}
                        </Link>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 transition-all duration-300">
                              <menu.icon className="w-4 h-4 mr-2" />
                              {menu.label}
                              <ChevronDown className="w-3 h-3 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-md shadow-xl border-0">
                            <DropdownMenuLabel className="text-gray-900 font-semibold">{menu.label}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {menu.items.map((item) => (
                              <Link
                                href={`/${item.id}`}
                                key={item.id}
                                //onClick={() => setActiveTab(item.id)}
                                className={`cursor-pointer transition-all duration-200 flex items-center gap-3 p-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                                  activeTab === item.id
                                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <item.icon className="w-4 h-4 mr-3 text-gray-600" />
                                <div>
                                  <div className="font-medium">{item.label}</div>
                                  <div className="text-xs text-gray-500">{item.description}</div>
                                </div>
                              </Link>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2 lg:gap-4">
                  {/* Search - Desktop */}
                  <div className="hidden md:block relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  {/* Notifications */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300"
                  >
                    <Bell className="w-4 h-4 text-gray-600" />
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 ring-2 ring-blue-200 hover:ring-blue-300 transition-all">
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
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
                <div className="px-4 py-4 space-y-2">
                  {menuStructure.map((menu) => (
                    <div key={menu.id}>
                      {menu.items.length === 0 ? (
                        <Button
                          variant={activeTab === menu.id ? "default" : "ghost"}
                          className={`w-full justify-start ${
                            activeTab === menu.id ? `bg-gradient-to-r ${menu.gradient} text-white` : "text-gray-700"
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
                          <div className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-50 rounded">
                            <menu.icon className="w-4 h-4 mr-2 inline" />
                            {menu.label}
                          </div>
                          {menu.items.map((item) => (
                            <Button
                              key={item.id}
                              variant="ghost"
                              className={`w-full justify-start pl-8 ${
                                activeTab === item.id ? "bg-blue-50 text-blue-700" : "text-gray-600"
                              }`}
                              onClick={() => {
                                setActiveTab(item.id)
                                setIsMobileMenuOpen(false)
                              }}
                            >
                              <item.icon className="w-4 h-4 mr-2" />
                              {item.label}
                            </Button>
                          ))}
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
