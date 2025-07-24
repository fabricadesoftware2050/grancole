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
import { URL_API } from "@/lib/utils"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import TopMenu from "@/components/ui/TopMenu";
import { useRouter } from "next/navigation"
import Loading from "@/components/ui/loading"

export default function Estudiantes() {
      const [mounted, setMounted] = useState(false);

  const [activeTab, setActiveTab] = useState("estudiantes")
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
  const [users, setUsers] = useState([])
 const router = useRouter()
  useEffect(() => {
        setMounted(true);
        getEstudiantes()
        if(localStorage.getItem("user")){
            setIsAuthenticated(true)
        }else{
            // Redirigir al login si no hay usuario autenticado
            router.push("/login")
        }

  }, [])
 // evitar renderizado SSR

const getEstudiantes = async ()  => {
          setIsLoading(true);
          setError("");
          setExito(false);

          await axios
              .get(`${URL_API}/api/v1/users?role=ADMINISTRADOR`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                  setExito(true);
                  setIsLoading(false);
                  setUsers(estudiantes);
                  console.log(res.data);


              })
              .catch((err) => {
                  setIsLoading(false);
                  if(err.response?.status ===401){
                    localStorage.removeItem("user")
                    localStorage.removeItem("token")
                    localStorage.removeItem("token_type")
                    setIsAuthenticated(false)
                    router.push("/login")
                  }
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

  // Datos de ejemplo expandidos (mantengo los mismos datos del código anterior)
  const estudiantes = [
    {
      id: 1,
      nombre: "Ana García Martínez",
      email: "ana.garcia@estudiante.edu",
      telefono: "+1 (555) 123-4567",
      grado: "10°A",
      edad: 16,
      direccion: "Calle 123 #45-67, Bogotá",
      fechaNacimiento: "2008-03-15",
      acudiente: "María Martínez",
      telefonoAcudiente: "+1 (555) 987-6543",
      promedio: 8.5,
      estado: "Activo",
      fechaIngreso: "2023-02-01",
      avatar: "AG",
      color: "from-rose-400 to-pink-500",
    },
    {
      id: 2,
      nombre: "Carlos López Rodríguez",
      email: "carlos.lopez@estudiante.edu",
      telefono: "+1 (555) 234-5678",
      grado: "10°A",
      edad: 15,
      direccion: "Carrera 45 #12-34, Medellín",
      fechaNacimiento: "2008-07-22",
      acudiente: "Pedro López",
      telefonoAcudiente: "+1 (555) 876-5432",
      promedio: 9.2,
      estado: "Activo",
      fechaIngreso: "2023-02-01",
      avatar: "CL",
      color: "from-blue-400 to-indigo-500",
    },
    {
      id: 3,
      nombre: "María Rodríguez Silva",
      email: "maria.rodriguez@estudiante.edu",
      telefono: "+1 (555) 345-6789",
      grado: "9°B",
      edad: 14,
      direccion: "Avenida 67 #89-12, Cali",
      fechaNacimiento: "2009-11-08",
      acudiente: "Ana Silva",
      telefonoAcudiente: "+1 (555) 765-4321",
      promedio: 7.8,
      estado: "Activo",
      fechaIngreso: "2023-02-01",
      avatar: "MR",
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: 4,
      nombre: "Diego Torres Mendoza",
      email: "diego.torres@estudiante.edu",
      telefono: "+1 (555) 456-7890",
      grado: "11°A",
      edad: 17,
      direccion: "Calle 89 #23-45, Barranquilla",
      fechaNacimiento: "2007-01-30",
      acudiente: "Luis Torres",
      telefonoAcudiente: "+1 (555) 654-3210",
      promedio: 8.9,
      estado: "Activo",
      fechaIngreso: "2022-02-01",
      avatar: "DT",
      color: "from-purple-400 to-violet-500",
    },
  ]

  const profesores = [
    {
      id: 1,
      nombre: "Dr. Roberto Sánchez",
      email: "roberto.sanchez@colegio.edu",
      telefono: "+1 (555) 111-2222",
      especialidad: "Matemáticas",
      experiencia: "15 años",
      titulo: "Doctorado en Matemáticas",
      materias: ["Álgebra", "Cálculo", "Geometría"],
      grados: ["9°", "10°", "11°"],
      estado: "Activo",
      fechaIngreso: "2018-08-15",
      salario: "$3,500,000",
      avatar: "RS",
      color: "from-blue-400 to-indigo-500",
    },
    {
      id: 2,
      nombre: "Lic. Carmen Herrera",
      email: "carmen.herrera@colegio.edu",
      telefono: "+1 (555) 222-3333",
      especialidad: "Literatura",
      experiencia: "12 años",
      titulo: "Licenciatura en Literatura",
      materias: ["Español", "Literatura", "Redacción"],
      grados: ["8°", "9°", "10°"],
      estado: "Activo",
      fechaIngreso: "2019-01-20",
      salario: "$3,200,000",
      avatar: "CH",
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: 3,
      nombre: "Mg. Patricia Vega",
      email: "patricia.vega@colegio.edu",
      telefono: "+1 (555) 333-4444",
      especialidad: "Ciencias Naturales",
      experiencia: "10 años",
      titulo: "Maestría en Biología",
      materias: ["Biología", "Química", "Física"],
      grados: ["9°", "10°", "11°"],
      estado: "Activo",
      fechaIngreso: "2020-03-10",
      salario: "$3,400,000",
      avatar: "PV",
      color: "from-purple-400 to-violet-500",
    },
    {
      id: 4,
      nombre: "Lic. Fernando Castro",
      email: "fernando.castro@colegio.edu",
      telefono: "+1 (555) 444-5555",
      especialidad: "Historia",
      experiencia: "8 años",
      titulo: "Licenciatura en Historia",
      materias: ["Historia", "Geografía", "Cívica"],
      grados: ["7°", "8°", "9°"],
      estado: "Activo",
      fechaIngreso: "2021-02-15",
      salario: "$3,000,000",
      avatar: "FC",
      color: "from-orange-400 to-red-500",
    },
  ]

  const examenes = [
    {
      id: 1,
      titulo: "Examen Final - Álgebra Lineal",
      materia: "Matemáticas",
      profesor: "Dr. Roberto Sánchez",
      grado: "10°A",
      fecha: "2024-01-25",
      hora: "10:00",
      duracion: "2 horas",
      estudiantes: 32,
      estado: "Programado",
      tipo: "Final",
      valor: "30%",
      descripcion: "Evaluación final del período sobre álgebra lineal, matrices y sistemas de ecuaciones.",
      color: "from-blue-400 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
      preguntas: 25,
    },
    {
      id: 2,
      titulo: "Evaluación - Historia del Siglo XX",
      materia: "Historia",
      profesor: "Lic. Carmen Herrera",
      grado: "9°B",
      fecha: "2024-01-26",
      hora: "14:00",
      duracion: "1.5 horas",
      estudiantes: 28,
      estado: "En Progreso",
      tipo: "Parcial",
      valor: "20%",
      descripcion: "Evaluación sobre los principales eventos del siglo XX y su impacto mundial.",
      color: "from-emerald-400 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      preguntas: 20,
    },
    {
      id: 3,
      titulo: "Quiz - Sistema Solar",
      materia: "Ciencias",
      profesor: "Mg. Patricia Vega",
      grado: "8°A",
      fecha: "2024-01-24",
      hora: "09:00",
      duracion: "45 min",
      estudiantes: 30,
      estado: "Completado",
      tipo: "Quiz",
      valor: "10%",
      descripcion: "Evaluación rápida sobre planetas, satélites y características del sistema solar.",
      color: "from-purple-400 to-violet-500",
      bgColor: "from-purple-50 to-violet-50",
      preguntas: 15,
    },
  ]

  const asistencia = [
    {
      id: 1,
      estudiante: "Ana García",
      grado: "10°A",
      presente: 18,
      ausente: 2,
      tardanza: 1,
      porcentaje: 90,
      avatar: "AG",
      color: "from-rose-400 to-pink-500",
      fecha: "2024-01-20",
    },
    {
      id: 2,
      estudiante: "Carlos López",
      grado: "10°A",
      presente: 20,
      ausente: 1,
      tardanza: 0,
      porcentaje: 95,
      avatar: "CL",
      color: "from-cyan-400 to-blue-500",
      fecha: "2024-01-20",
    },
    {
      id: 3,
      estudiante: "María Rodríguez",
      grado: "10°A",
      presente: 17,
      ausente: 3,
      tardanza: 1,
      porcentaje: 85,
      avatar: "MR",
      color: "from-amber-400 to-orange-500",
      fecha: "2024-01-20",
    },
    {
      id: 4,
      estudiante: "Diego Torres",
      grado: "11°A",
      presente: 19,
      ausente: 1,
      tardanza: 2,
      porcentaje: 92,
      avatar: "DT",
      color: "from-purple-400 to-violet-500",
      fecha: "2024-01-20",
    },
  ]

  const actividades = [
    {
      id: 1,
      titulo: "Festival de Ciencias 2024",
      descripcion: "Exposición de proyectos científicos estudiantiles",
      fecha: "2024-02-15",
      horaInicio: "08:00",
      horaFin: "17:00",
      lugar: "Auditorio Principal",
      tipo: "Evento Académico",
      participantes: 150,
      responsable: "Mg. Patricia Vega",
      estado: "Planificando",
      presupuesto: "$2,500,000",
      color: "from-blue-400 to-indigo-500",
    },
    {
      id: 2,
      titulo: "Competencia de Matemáticas",
      descripcion: "Olimpiadas matemáticas inter-cursos",
      fecha: "2024-02-20",
      horaInicio: "14:00",
      horaFin: "16:00",
      lugar: "Aula Magna",
      tipo: "Competencia",
      participantes: 45,
      responsable: "Dr. Roberto Sánchez",
      estado: "Inscripciones Abiertas",
      presupuesto: "$800,000",
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: 3,
      titulo: "Obra de Teatro - Romeo y Julieta",
      descripcion: "Presentación teatral del grupo de drama",
      fecha: "2024-03-01",
      horaInicio: "19:00",
      horaFin: "21:00",
      lugar: "Teatro del Colegio",
      tipo: "Arte y Cultura",
      participantes: 25,
      responsable: "Lic. Carmen Herrera",
      estado: "En Ensayos",
      presupuesto: "$1,200,000",
      color: "from-purple-400 to-violet-500",
    },
  ]

  const materiales = [
    {
      id: 1,
      titulo: "Guía de Álgebra Lineal - Capítulo 5",
      descripcion: "Material de estudio sobre matrices y determinantes",
      materia: "Matemáticas",
      profesor: "Dr. Roberto Sánchez",
      tipo: "PDF",
      tamaño: "2.5 MB",
      fechaSubida: "2024-01-20",
      descargas: 45,
      grado: "10°",
      url: "#",
      color: "from-blue-400 to-indigo-500",
    },
    {
      id: 2,
      titulo: "Presentación - Revolución Industrial",
      descripcion: "Slides sobre la revolución industrial y sus consecuencias",
      materia: "Historia",
      profesor: "Lic. Carmen Herrera",
      tipo: "PPTX",
      tamaño: "15.2 MB",
      fechaSubida: "2024-01-19",
      descargas: 32,
      grado: "9°",
      url: "#",
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: 3,
      titulo: "Laboratorio Virtual - Química Orgánica",
      descripcion: "Simulador interactivo para experimentos de química",
      materia: "Ciencias",
      profesor: "Mg. Patricia Vega",
      tipo: "Link",
      tamaño: "-",
      fechaSubida: "2024-01-18",
      descargas: 28,
      grado: "11°",
      url: "#",
      color: "from-purple-400 to-violet-500",
    },
  ]

  const foros = [
    {
      id: 1,
      titulo: "Dudas sobre Ecuaciones Cuadráticas",
      descripcion: "Espacio para resolver dudas sobre el tema de ecuaciones cuadráticas",
      materia: "Matemáticas",
      autor: "Ana García",
      fechaCreacion: "2024-01-20",
      respuestas: 12,
      ultimaActividad: "Hace 2 horas",
      estado: "Activo",
      participantes: 8,
      color: "from-blue-400 to-indigo-500",
    },
    {
      id: 2,
      titulo: "Proyecto de Historia - Ayuda Colaborativa",
      descripcion: "Compartir recursos y ayudarse mutuamente en el proyecto final",
      materia: "Historia",
      autor: "Carlos López",
      fechaCreacion: "2024-01-18",
      respuestas: 8,
      ultimaActividad: "Hace 5 horas",
      estado: "Activo",
      participantes: 6,
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: 3,
      titulo: "Experimento de Física - Resultados",
      descripcion: "Compartir y discutir los resultados del experimento de péndulo",
      materia: "Física",
      autor: "María Rodríguez",
      fechaCreacion: "2024-01-15",
      respuestas: 15,
      ultimaActividad: "Hace 1 día",
      estado: "Resuelto",
      participantes: 10,
      color: "from-purple-400 to-violet-500",
    },
  ]

  const desempeno = [
    {
      id: 1,
      estudiante: "Ana García",
      grado: "10°A",
      promedio: 8.5,
      matematicas: 9.0,
      ciencias: 8.2,
      historia: 8.8,
      literatura: 8.0,
      tendencia: "up",
      avatar: "AG",
      color: "from-rose-400 to-pink-500",
    },
    {
      id: 2,
      estudiante: "Carlos López",
      grado: "10°A",
      promedio: 9.2,
      matematicas: 9.5,
      ciencias: 9.0,
      historia: 8.8,
      literatura: 9.5,
      tendencia: "up",
      avatar: "CL",
      color: "from-blue-400 to-indigo-500",
    },
    {
      id: 3,
      estudiante: "María Rodríguez",
      grado: "9°B",
      promedio: 7.8,
      matematicas: 7.5,
      ciencias: 8.0,
      historia: 8.2,
      literatura: 7.5,
      tendencia: "down",
      avatar: "MR",
      color: "from-emerald-400 to-teal-500",
    },
  ]

  const matriculas = [
    {
      id: 1,
      estudiante: "Sofía Ramírez",
      email: "sofia.ramirez@estudiante.edu",
      telefono: "+1 (555) 567-8901",
      grado: "6°A",
      fechaSolicitud: "2024-01-15",
      estado: "Pendiente",
      documentos: ["Certificado de nacimiento", "Notas anteriores"],
      acudiente: "Carmen Ramírez",
      avatar: "SR",
      color: "from-pink-400 to-rose-500",
    },
    {
      id: 2,
      estudiante: "Andrés Morales",
      email: "andres.morales@estudiante.edu",
      telefono: "+1 (555) 678-9012",
      grado: "7°B",
      fechaSolicitud: "2024-01-18",
      estado: "Aprobada",
      documentos: ["Certificado de nacimiento", "Notas anteriores", "Certificado médico"],
      acudiente: "Luis Morales",
      avatar: "AM",
      color: "from-cyan-400 to-blue-500",
    },
    {
      id: 3,
      estudiante: "Isabella Cruz",
      email: "isabella.cruz@estudiante.edu",
      telefono: "+1 (555) 789-0123",
      grado: "8°A",
      fechaSolicitud: "2024-01-20",
      estado: "En Revisión",
      documentos: ["Certificado de nacimiento"],
      acudiente: "María Cruz",
      avatar: "IC",
      color: "from-amber-400 to-orange-500",
    },
  ]

  const boletines = [
    {
      id: 1,
      estudiante: "Ana García",
      grado: "10°A",
      periodo: "Primer Período 2024",
      promedio: 8.5,
      materias: [
        { nombre: "Matemáticas", nota: 9.0, profesor: "Dr. Roberto Sánchez" },
        { nombre: "Ciencias", nota: 8.2, profesor: "Mg. Patricia Vega" },
        { nombre: "Historia", nota: 8.8, profesor: "Lic. Fernando Castro" },
        { nombre: "Literatura", nota: 8.0, profesor: "Lic. Carmen Herrera" },
      ],
      observaciones: "Excelente desempeño académico. Continuar con el buen trabajo.",
      avatar: "AG",
      color: "from-rose-400 to-pink-500",
    },
    {
      id: 2,
      estudiante: "Carlos López",
      grado: "10°A",
      periodo: "Primer Período 2024",
      promedio: 9.2,
      materias: [
        { nombre: "Matemáticas", nota: 9.5, profesor: "Dr. Roberto Sánchez" },
        { nombre: "Ciencias", nota: 9.0, profesor: "Mg. Patricia Vega" },
        { nombre: "Historia", nota: 8.8, profesor: "Lic. Fernando Castro" },
        { nombre: "Literatura", nota: 9.5, profesor: "Lic. Carmen Herrera" },
      ],
      observaciones: "Estudiante destacado con excelente rendimiento en todas las áreas.",
      avatar: "CL",
      color: "from-blue-400 to-indigo-500",
    },
  ]

  const stats = [
    {
      title: "Total Estudiantes",
      value: "1,234",
      change: "+12%",
      icon: Users,
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      bgGradient: "from-blue-50 via-indigo-50 to-purple-50",
      iconBg: "from-blue-400 to-indigo-500",
    },
    {
      title: "Profesores Activos",
      value: "89",
      change: "+3%",
      icon: GraduationCap,
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      bgGradient: "from-emerald-50 via-teal-50 to-cyan-50",
      iconBg: "from-emerald-400 to-teal-500",
    },
    {
      title: "Exámenes Programados",
      value: "23",
      change: "+8%",
      icon: FileText,
      gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
      bgGradient: "from-violet-50 via-purple-50 to-fuchsia-50",
      iconBg: "from-violet-400 to-purple-500",
    },
    {
      title: "Asistencia Promedio",
      value: "94.2%",
      change: "+2.1%",
      icon: UserCheck,
      gradient: "from-orange-500 via-amber-500 to-yellow-600",
      bgGradient: "from-orange-50 via-amber-50 to-yellow-50",
      iconBg: "from-orange-400 to-amber-500",
    },
  ]


const handleEdit = (item) => {
      setEditingItem(item)
      setFormData(item)
      setIsModalOpen(true)
    }

    const handleSave = () => {
      console.log("Guardando:", formData)
      setIsModalOpen(false)
      setEditingItem(null)
      setFormData({})
    }

    const handleDelete = (id) => {
      console.log("Eliminando:", id)
    }

    const filterData = (data, searchTerm) => {
      if (!searchTerm) return data
      return data.filter((item) =>
        Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }





if (!mounted) return null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Navigation Bar */}
                  <ToastContainer />

      <TopMenu/>
{isLoading && <Loading/>}

      {/* Main Content */}
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-white/20 px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {activeTab === "home" && "Inicio"}
                {activeTab === "estudiantes" && "Gestión de Estudiantes"}
                {activeTab === "teachers" && "Gestión de Profesores"}
                {activeTab === "examenes" && "Gestión de Exámenes"}
                {activeTab === "desempeno" && "Análisis de Desempeño"}
                {activeTab === "asistencia" && "Control de Asistencia"}
                {activeTab === "matriculas" && "Proceso de Matrículas"}
                {activeTab === "actividades" && "Actividades Escolares"}
                {activeTab === "materiales" && "Material de Clase"}
                {activeTab === "foros" && "Foros de Discusión"}
                {activeTab === "boletines" && "Boletines y Calificaciones"}
                {activeTab === "settings" && "Configuración del Sistema"}
              </h2>
              <p className="text-gray-600 mt-1">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Quick Action Button */}
            {activeTab !== "home" && (
              <Button
                onClick={() => handleCreate("item")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo
              </Button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 lg:p-6">
          {/* Dashboard Content */}
          {activeTab === "home" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className={`bg-gradient-to-br ${stat.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-700 group-hover:text-gray-800 transition-colors">
                        {stat.title}
                      </CardTitle>
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${stat.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="flex items-center text-xs">
                        <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {stat.change}
                        </div>
                        <span className="text-gray-500 ml-2">desde el mes pasado</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions - MOVED TO TOP */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  Acciones Rápidas
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    {
                      icon: UserPlus,
                      label: "Nuevo Estudiante",
                      color: "from-blue-400 to-indigo-500",
                      action: "nuevo-estudiante",
                    },
                    {
                      icon: GraduationCap,
                      label: "Nuevo Profesor",
                      color: "from-emerald-400 to-teal-500",
                      action: "nuevo-profesor",
                    },
                    {
                      icon: FileText,
                      label: "Crear Examen",
                      color: "from-purple-400 to-violet-500",
                      action: "crear-examen",
                    },
                    {
                      icon: Calendar,
                      label: "Programar Clase",
                      color: "from-rose-400 to-pink-500",
                      action: "programar-clase",
                    },
                    {
                      icon: MessageSquare,
                      label: "Enviar Mensaje",
                      color: "from-amber-400 to-orange-500",
                      action: "enviar-mensaje",
                    },
                    {
                      icon: BarChart3,
                      label: "Ver Reportes",
                      color: "from-cyan-400 to-blue-500",
                      action: "ver-reportes",
                    },
                  ].map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleQuickAction(action.action)}
                      className="h-20 flex-col gap-2 bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                    >
                      <div
                        className={`w-8 h-8 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}
                      >
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 text-center">
                        {action.label}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Cronograma de Períodos */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-gray-900">Cronograma de Períodos</CardTitle>
                        <CardDescription className="text-gray-600">
                          Fechas importantes del año académico
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-3 font-medium text-gray-700">Período</th>
                            <th className="text-left py-2 px-3 font-medium text-gray-700">Planeación</th>
                            <th className="text-left py-2 px-3 font-medium text-gray-700">Calificaciones</th>
                            <th className="text-left py-2 px-3 font-medium text-gray-700">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="space-y-2">
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-3">
                              <div className="font-medium text-gray-900">PRIMERO</div>
                              <div className="text-xs text-gray-500">25.00</div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="text-xs">
                                <div className="text-green-600 font-medium">Ini: 10/01/2025 6:00:00</div>
                                <div className="text-red-600">Fin: 30/11/2025 23:00:00</div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="text-xs">
                                <div className="text-green-600 font-medium">Ini: 10/01/2025 6:00:00</div>
                                <div className="text-red-600">Fin: 30/11/2025 23:00:00</div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <Badge className="bg-green-100 text-green-700 text-xs">Abierto</Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-3">
                              <div className="font-medium text-gray-900">SEGUNDO</div>
                              <div className="text-xs text-gray-500">25.00</div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="text-xs">
                                <div className="text-green-600 font-medium">Ini: 28/01/2025 6:00:00</div>
                                <div className="text-red-600">Fin: 30/11/2025 23:00:00</div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="text-xs">
                                <div className="text-green-600 font-medium">Ini: 28/01/2025 6:00:00</div>
                                <div className="text-red-600">Fin: 30/11/2025 23:00:00</div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <Badge className="bg-blue-100 text-blue-700 text-xs">Programado</Badge>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-3">
                              <div className="font-medium text-gray-900">TERCERO</div>
                              <div className="text-xs text-gray-500">25.00</div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="text-xs">
                                <div className="text-gray-600">Ini: 04/07/2025 6:00:00</div>
                                <div className="text-gray-600">Fin: 30/11/2025 23:00:00</div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="text-xs">
                                <div className="text-gray-600">Ini: 04/07/2025 6:00:00</div>
                                <div className="text-gray-600">Fin: 30/11/2025 23:00:00</div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <Badge className="bg-gray-100 text-gray-700 text-xs">Cerrado</Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Base de Conocimientos para Soporte */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-gray-900">Base de Conocimientos</CardTitle>
                        <CardDescription className="text-gray-600">Canales de atención al usuario</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Base de Conocimientos */}
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-semibold text-purple-800">Base de Conocimientos</h4>
                        </div>
                        <p className="text-sm text-purple-700">Aprende todo lo que necesitas saber de SINAI en cualquier momento.</p>
                      </div>

                      {/* Teléfono */}
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-semibold text-green-800">300913455</h4>
                        </div>
                        <p className="text-sm text-green-700">Lunes de lunes a viernes de 7:00 a.m. a 12:30 p.m. y de 2:00 a 5:00 p.m.</p>
                      </div>

                      {/* Email */}
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                            <Mail className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-semibold text-blue-800">servicioalcliente@siempre.net.co</h4>
                        </div>
                        <p className="text-sm text-blue-700">Todos los mensajes recibidos serán gestionados a través de la plataforma de tickets</p>
                      </div>

                      {/* Chat Integrado */}
                      <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-semibold text-indigo-800">Chat Integrado</h4>
                        </div>
                        <p className="text-sm text-indigo-700">Horarios de lunes a viernes de 7:00 a.m. a 12:30 p.m. y de 2:00 a 5:00 p.m.</p>
                        <Button size="sm" className="mt-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                          Solicitar Ayuda
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Otras secciones - mantengo la misma estructura para todas las demás secciones */}
              {/* Por brevedad, incluyo solo algunas secciones clave, pero todas siguen el mismo patrón */}

            </div>
          )}
        </div>
              {/* Configuración */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="grid gap-6">
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-slate-500 rounded-lg flex items-center justify-center">
                            <Settings className="w-4 h-4 text-white" />
                          </div>
                          Configuración General
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="institution-name">Nombre de la Institución</Label>
                            <Input id="institution-name" defaultValue="Colegio San José" />
                          </div>
                          <div>
                            <Label htmlFor="academic-year">Año Académico</Label>
                            <Input id="academic-year" defaultValue="2024" />
                          </div>
                          <div>
                            <Label htmlFor="timezone">Zona Horaria</Label>
                            <Select defaultValue="america/bogota">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="america/bogota">América/Bogotá</SelectItem>
                                <SelectItem value="america/mexico">América/México</SelectItem>
                                <SelectItem value="america/lima">América/Lima</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="language">Idioma</Label>
                            <Select defaultValue="es">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="pt">Português</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}


            {/* Estudiantes */}
            {activeTab === "estudiantes" && (
              <div className="space-y-6">
                <div className="grid gap-4">\
                  {filterData(estudiantes, searchTerm).map((estudiante) => (
                    <Card
                      key={estudiante.id}
                      className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16 ring-2 ring-white shadow-lg">
                              <AvatarFallback
                                className={`bg-gradient-to-br ${estudiante.color} text-white font-bold text-lg`}
                              >
                                {estudiante.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900">{estudiante.nombre}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {estudiante.email}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {estudiante.telefono}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <Badge className="bg-blue-100 text-blue-700">{estudiante.grado}</Badge>
                                <span>Promedio: {estudiante.promedio}</span>
                                <Badge
                                  className={`${estudiante.estado === "Activo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                >
                                  {estudiante.estado}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(estudiante)}
                              className="bg-white/80 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-white/80 hover:bg-green-50">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(estudiante.id)}
                              className="bg-white/80 hover:bg-red-50 text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Profesores */}
            {activeTab === "teachers" && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  {filterData(profesores, searchTerm).map((profesor) => (
                    <Card
                      key={profesor.id}
                      className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16 ring-2 ring-white shadow-lg">
                              <AvatarFallback
                                className={`bg-gradient-to-br ${profesor.color} text-white font-bold text-lg`}
                              >
                                {profesor.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900">{profesor.nombre}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {profesor.email}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {profesor.telefono}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <Badge className="bg-purple-100 text-purple-700">{profesor.especialidad}</Badge>
                                <span>Experiencia: {profesor.experiencia}</span>
                                <Badge
                                  className={`${profesor.estado === "Activo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                >
                                  {profesor.estado}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                {profesor.materias.slice(0, 3).map((materia, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {materia}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(profesor)}
                              className="bg-white/80 hover:bg-purple-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-white/80 hover:bg-green-50">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(profesor.id)}
                              className="bg-white/80 hover:bg-red-50 text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Exámenes */}
            {activeTab === "examenes" && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  {filterData(examenes, searchTerm).map((examen) => (
                    <Card
                      key={examen.id}
                      className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${examen.color} rounded-xl flex items-center justify-center shadow-lg`}
                            >
                              <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-gray-900 mb-2">{examen.titulo}</h4>
                              <p className="text-gray-600 mb-3">{examen.descripcion}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Materia:</span>
                                  <p className="font-medium">{examen.materia}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Profesor:</span>
                                  <p className="font-medium">{examen.profesor}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Fecha:</span>
                                  <p className="font-medium">
                                    {examen.fecha} - {examen.hora}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Duración:</span>
                                  <p className="font-medium">{examen.duracion}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 mt-3">
                                <Badge className="bg-rose-100 text-rose-700">{examen.grado}</Badge>
                                <Badge className="bg-purple-100 text-purple-700">{examen.tipo}</Badge>
                                <Badge
                                  className={`${
                                    examen.estado === "Completado"
                                      ? "bg-green-100 text-green-700"
                                      : examen.estado === "En Progreso"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  {examen.estado}
                                </Badge>
                                <span className="text-sm text-gray-600">{examen.estudiantes} estudiantes</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(examen)}
                              className="bg-white/80 hover:bg-rose-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-white/80 hover:bg-green-50">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(examen.id)}
                              className="bg-white/80 hover:bg-red-50 text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Otras secciones - mantengo la misma estructura para todas las demás secciones */}
            {/* Por brevedad, incluyo solo algunas secciones clave, pero todas siguen el mismo patrón */}

            {/* Configuración */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="grid gap-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-slate-500 rounded-lg flex items-center justify-center">
                          <Settings className="w-4 h-4 text-white" />
                        </div>
                        Configuración General
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="institution-name">Nombre de la Institución</Label>
                          <Input id="institution-name" defaultValue="Colegio San José" />
                        </div>
                        <div>
                          <Label htmlFor="academic-year">Año Académico</Label>
                          <Input id="academic-year" defaultValue="2024" />
                        </div>
                        <div>
                          <Label htmlFor="timezone">Zona Horaria</Label>
                          <Select defaultValue="america/bogota">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="america/bogota">América/Bogotá</SelectItem>
                              <SelectItem value="america/mexico">América/México</SelectItem>
                              <SelectItem value="america/lima">América/Lima</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="language">Idioma</Label>
                          <Select defaultValue="es">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="pt">Português</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}


          {/* Modal para formularios */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Editar" : "Crear"} {activeTab === "estudiantes" && "Estudiante"}
                  {activeTab === "teachers" && "Profesor"}
                  {activeTab === "examenes" && "Examen"}
                </DialogTitle>
                <DialogDescription>{editingItem ? "Modifica" : "Completa"} la información requerida</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Formulario básico - se puede expandir según la sección */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre || ""}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? "Actualizar" : "Crear"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    )
}
