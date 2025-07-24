"use client"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  ChevronLeft,
  Check,
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  Calendar,
  Award,
  MessageSquare,
  Settings,
  Star,
  Play,
  SkipBackIcon as Skip,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Sparkles,
  Zap,
  Rocket,
  Crown,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userRole, setUserRole] = useState<"admin" | "teacher" | "student">("admin")
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    avatar: "",
  })

  const steps = [
    {
      id: 0,
      title: "¡Bienvenido a EduGest Pro!",
      description: "Tu plataforma integral de gestión educativa",
      component: "welcome",
      gradient: "from-violet-600 via-purple-600 to-blue-600",
      bgColor: "bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50",
    },
    {
      id: 1,
      title: "Selecciona tu rol",
      description: "Personaliza tu experiencia según tu función",
      component: "role-selection",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50",
    },
    {
      id: 2,
      title: "Configura tu perfil",
      description: "Completa tu información personal",
      component: "profile-setup",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
      bgColor: "bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50",
    },
    {
      id: 3,
      title: "Tour de funcionalidades",
      description: "Descubre las características principales",
      component: "feature-tour",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-amber-50 via-orange-50 to-red-50",
    },
    {
      id: 4,
      title: "Primeros pasos",
      description: "Tareas recomendadas para comenzar",
      component: "first-steps",
      gradient: "from-indigo-500 via-blue-500 to-sky-500",
      bgColor: "bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50",
    },
    {
      id: 5,
      title: "¡Todo listo!",
      description: "Comienza a usar EduGest Pro",
      component: "completion",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50",
    },
  ]

  const features = {
    admin: [
      {
        icon: Users,
        title: "Gestión de Usuarios",
        description: "Administra estudiantes, profesores y personal",
        color: "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700",
        iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
      },
      {
        icon: BarChart3,
        title: "Reportes y Analytics",
        description: "Visualiza estadísticas y genera reportes",
        color: "bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700",
        iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      },
      {
        icon: Settings,
        title: "Configuración del Sistema",
        description: "Personaliza la plataforma según tus necesidades",
        color: "bg-gradient-to-br from-purple-100 to-violet-100 text-purple-700",
        iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
      },
      {
        icon: Award,
        title: "Gestión Académica",
        description: "Supervisa calificaciones y rendimiento",
        color: "bg-gradient-to-br from-orange-100 to-red-100 text-orange-700",
        iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
      },
    ],
    teacher: [
      {
        icon: BookOpen,
        title: "Mis Clases",
        description: "Gestiona tus materias y estudiantes",
        color: "bg-gradient-to-br from-cyan-100 to-blue-100 text-cyan-700",
        iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
      },
      {
        icon: Award,
        title: "Calificaciones",
        description: "Registra notas y genera boletines",
        color: "bg-gradient-to-br from-green-100 to-emerald-100 text-green-700",
        iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      },
      {
        icon: Calendar,
        title: "Horarios",
        description: "Consulta y planifica tus clases",
        color: "bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700",
        iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
      },
      {
        icon: MessageSquare,
        title: "Comunicación",
        description: "Interactúa con estudiantes y padres",
        color: "bg-gradient-to-br from-pink-100 to-rose-100 text-pink-700",
        iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
      },
    ],
    student: [
      {
        icon: BookOpen,
        title: "Mis Materias",
        description: "Accede a contenido y tareas",
        color: "bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-700",
        iconBg: "bg-gradient-to-br from-sky-500 to-cyan-600",
      },
      {
        icon: Award,
        title: "Mis Calificaciones",
        description: "Consulta tus notas y boletines",
        color: "bg-gradient-to-br from-lime-100 to-green-100 text-lime-700",
        iconBg: "bg-gradient-to-br from-lime-500 to-green-600",
      },
      {
        icon: Calendar,
        title: "Mi Horario",
        description: "Revisa tus clases y exámenes",
        color: "bg-gradient-to-br from-fuchsia-100 to-pink-100 text-fuchsia-700",
        iconBg: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
      },
      {
        icon: MessageSquare,
        title: "Foros",
        description: "Participa en discusiones académicas",
        color: "bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700",
        iconBg: "bg-gradient-to-br from-amber-500 to-yellow-600",
      },
    ],
  }

  const firstStepsTasks = {
    admin: [
      { id: 1, task: "Configurar información de la institución", completed: false, color: "text-blue-600" },
      { id: 2, task: "Importar lista de estudiantes", completed: false, color: "text-emerald-600" },
      { id: 3, task: "Registrar profesores", completed: false, color: "text-purple-600" },
      { id: 4, task: "Crear períodos académicos", completed: false, color: "text-orange-600" },
      { id: 5, task: "Configurar materias y cursos", completed: false, color: "text-pink-600" },
    ],
    teacher: [
      { id: 1, task: "Completar perfil profesional", completed: false, color: "text-cyan-600" },
      { id: 2, task: "Revisar lista de estudiantes", completed: false, color: "text-green-600" },
      { id: 3, task: "Subir material de clase", completed: false, color: "text-violet-600" },
      { id: 4, task: "Crear primer examen", completed: false, color: "text-rose-600" },
      { id: 5, task: "Configurar comunicación con padres", completed: false, color: "text-amber-600" },
    ],
    student: [
      { id: 1, task: "Completar perfil estudiantil", completed: false, color: "text-sky-600" },
      { id: 2, task: "Revisar horario de clases", completed: false, color: "text-lime-600" },
      { id: 3, task: "Descargar material de estudio", completed: false, color: "text-fuchsia-600" },
      { id: 4, task: "Participar en un foro", completed: false, color: "text-yellow-600" },
      { id: 5, task: "Consultar calificaciones", completed: false, color: "text-teal-600" },
    ],
  }

  const [tasks, setTasks] = useState(firstStepsTasks[userRole])

  useEffect(() => {
    setTasks(firstStepsTasks[userRole])
  }, [userRole])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true")
    localStorage.setItem("userRole", userRole)
    window.location.href = "/"
  }

  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true")
    localStorage.setItem("userRole", userRole)
    localStorage.setItem("userProfile", JSON.stringify(userProfile))
    window.location.href = "/"
  }

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className={`min-h-screen transition-all duration-1000 ${steps[currentStep].bgColor}`}>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${steps[currentStep].gradient} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduGest Pro</h1>
                <p className="text-sm text-gray-600">Configuración inicial</p>
              </div>
            </div>
            <Button variant="ghost" onClick={skipOnboarding} className="text-gray-600 hover:bg-white/50">
              <Skip className="w-4 h-4 mr-2" />
              Saltar
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm font-medium text-gray-700">
            Paso {currentStep + 1} de {steps.length}
          </span>
          <div className="flex-1">
            <div className="w-full bg-white/50 rounded-full h-3 shadow-inner">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${steps[currentStep].gradient} transition-all duration-500 shadow-lg`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <span className="text-sm text-gray-600 font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`w-4 h-4 rounded-full transition-all duration-500 shadow-md ${
                index <= currentStep
                  ? `bg-gradient-to-br ${step.gradient} scale-110`
                  : index === currentStep + 1
                    ? "bg-gradient-to-br from-gray-300 to-gray-400 scale-105"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-lg text-gray-700">{steps[currentStep].description}</p>
        </div>

        {/* Welcome Step */}
        {currentStep === 0 && (
          <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-4">
                ¡Bienvenido a la revolución educativa!
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                EduGest Pro es tu plataforma integral para gestionar todos los aspectos de tu institución educativa.
                Desde estudiantes y profesores hasta calificaciones y comunicación, todo en un solo lugar.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Gestión de Usuarios</p>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Calificaciones</p>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Horarios</p>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Reportes</p>
                </div>
              </div>
              <Button
                onClick={nextStep}
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Comenzar configuración
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Role Selection Step */}
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card
                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-0 ${
                  userRole === "admin"
                    ? "ring-4 ring-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl scale-105"
                    : "bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90"
                }`}
                onClick={() => setUserRole("admin")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Administrador</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Gestiona toda la institución, usuarios, configuraciones y reportes generales.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
                      <span className="text-gray-700">Gestión completa de usuarios</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full"></div>
                      <span className="text-gray-700">Reportes y analytics</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                      <span className="text-gray-700">Configuración del sistema</span>
                    </div>
                  </div>
                  {userRole === "admin" && (
                    <Badge className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                      ✨ Seleccionado
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-0 ${
                  userRole === "teacher"
                    ? "ring-4 ring-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-2xl scale-105"
                    : "bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90"
                }`}
                onClick={() => setUserRole("teacher")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Profesor</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Gestiona tus clases, estudiantes, calificaciones y material educativo.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Gestión de clases</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"></div>
                      <span className="text-gray-700">Registro de calificaciones</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"></div>
                      <span className="text-gray-700">Material educativo</span>
                    </div>
                  </div>
                  {userRole === "teacher" && (
                    <Badge className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                      ✨ Seleccionado
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-0 ${
                  userRole === "student"
                    ? "ring-4 ring-purple-400 bg-gradient-to-br from-purple-50 to-violet-50 shadow-2xl scale-105"
                    : "bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90"
                }`}
                onClick={() => setUserRole("student")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Estudiante</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Accede a tus materias, calificaciones, horarios y recursos educativos.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full"></div>
                      <span className="text-gray-700">Acceso a materias</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-lime-400 to-green-500 rounded-full"></div>
                      <span className="text-gray-700">Consulta de calificaciones</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"></div>
                      <span className="text-gray-700">Recursos educativos</span>
                    </div>
                  </div>
                  {userRole === "student" && (
                    <Badge className="mt-6 bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg">
                      ✨ Seleccionado
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Profile Setup Step */}
        {currentStep === 2 && (
          <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <Avatar className="w-28 h-28 mx-auto shadow-2xl ring-4 ring-pink-200">
                    <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-white">
                      {userProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Nombre completo *
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <Input
                        id="name"
                        placeholder="Tu nombre completo"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                        className="pl-12 h-12 border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-400 bg-white/80"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Correo electrónico *
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                        <Mail className="w-3 h-3 text-white" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                        className="pl-12 h-12 border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-400 bg-white/80"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      Teléfono
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg flex items-center justify-center">
                        <Phone className="w-3 h-3 text-white" />
                      </div>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                        className="pl-12 h-12 border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-400 bg-white/80"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-700 font-medium">
                      Dirección
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-white" />
                      </div>
                      <Input
                        id="address"
                        placeholder="Tu dirección"
                        value={userProfile.address}
                        onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                        className="pl-12 h-12 border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-400 bg-white/80"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-700 font-medium">
                    Biografía
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Cuéntanos un poco sobre ti..."
                    value={userProfile.bio}
                    onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                    rows={4}
                    className="border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-400 bg-white/80"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feature Tour Step */}
        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent mb-2">
                Funcionalidades para{" "}
                {userRole === "admin" ? "Administradores" : userRole === "teacher" ? "Profesores" : "Estudiantes"}
              </h3>
              <p className="text-gray-700 text-lg">Descubre todo lo que puedes hacer con EduGest Pro</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features[userRole].map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-white/90 backdrop-blur-sm"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.iconBg} shadow-xl`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-600">Muy útil</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-700 mb-6 text-lg">¿Quieres ver una demostración interactiva?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demo
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white shadow-lg"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* First Steps Step */}
        {currentStep === 4 && (
          <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Primeros pasos recomendados
              </CardTitle>
              <CardDescription className="text-gray-700 text-lg">
                Completa estas tareas para aprovechar al máximo EduGest Pro
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-500 hover:scale-102 ${
                      task.completed
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg"
                        : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 hover:border-indigo-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50"
                    }`}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="shrink-0 w-5 h-5"
                    />
                    <div
                      className={`w-3 h-3 rounded-full ${task.completed ? "bg-gradient-to-r from-green-400 to-emerald-500" : `bg-gradient-to-r ${getTaskGradient(index)}`} shrink-0`}
                    ></div>
                    <span
                      className={`flex-1 font-medium ${task.completed ? "text-green-800 line-through" : task.color}`}
                    >
                      {task.task}
                    </span>
                    {task.completed && (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border-2 border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">{tasks.filter((t) => t.completed).length}</span>
                  </div>
                  <span className="font-semibold text-indigo-800 text-lg">
                    {tasks.filter((t) => t.completed).length} de {tasks.length} tareas completadas
                  </span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-4 shadow-inner">
                  <div
                    className="h-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 transition-all duration-500 shadow-lg"
                    style={{ width: `${(tasks.filter((t) => t.completed).length / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-sm text-gray-600 text-center mt-6 bg-blue-50 p-4 rounded-xl">
                💡 No te preocupes, puedes completar estas tareas más tarde desde el dashboard
              </p>
            </CardContent>
          </Card>
        )}

        {/* Completion Step */}
        {currentStep === 5 && (
          <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-10 text-center">
              <div className="w-28 h-28 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Check className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
                ¡Configuración completada!
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                Excelente, <span className="font-semibold text-emerald-600">{userProfile.name || "Usuario"}</span>. Tu
                cuenta está lista para usar. Ahora puedes acceder a todas las funcionalidades de EduGest Pro y comenzar
                a gestionar tu institución educativa de manera eficiente.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:shadow-2xl">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Perfil configurado</p>
                </div>
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:shadow-2xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Rol asignado</p>
                </div>
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:shadow-2xl">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Listo para usar</p>
                </div>
              </div>

              <Button
                onClick={completeOnboarding}
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-4"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Ir al Dashboard
              </Button>

              <p className="text-sm text-gray-600 mt-6 bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
                🎉 Si necesitas ayuda, puedes acceder al centro de ayuda desde el menú principal
              </p>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`${currentStep === 0 ? "invisible" : ""} bg-white/80 backdrop-blur-sm border-2 hover:bg-white/90 shadow-lg`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <div className="flex items-center gap-4">
            {currentStep < steps.length - 1 && (
              <Button
                onClick={nextStep}
                disabled={currentStep === 2 && !userProfile.name}
                className={`bg-gradient-to-r ${steps[currentStep].gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

// Helper function for task gradients
function getTaskGradient(index: number) {
  const gradients = [
    "from-blue-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-purple-400 to-violet-500",
    "from-orange-400 to-red-500",
    "from-pink-400 to-rose-500",
  ]
  return gradients[index % gradients.length]
}
