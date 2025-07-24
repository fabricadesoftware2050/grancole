"use client"

import { useState, useEffect, useRef } from "react"
import Select from 'react-select';

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
  Settings2,
  Building,
  Delete,
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
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { URL_API } from "@/lib/utils"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import TopMenu from "@/components/ui/TopMenu";
import { useRouter } from "next/navigation"
import Loading from "@/components/ui/loading"
import { jwtDecode } from "jwt-decode";

export default function Institucion() {
      const [mounted, setMounted] = useState(false);

  const [activeTab, setActiveTab] = useState("institucion")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [exito, setExito] = useState(false)
  const [institucion, setInstitucion] = useState()
  const [user, setUser] = useState()
  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [idDepartamento, setIdDepartamento] = useState()
  const [idMunicipio, setIdMunicipio] = useState()
    const [previewUrlRector, setPreviewUrlRector] = useState(null);
    const [previewUrlAuxiliar, setPreviewUrlAuxiliar] = useState(null);
    const [previewUrlEncabezadoMembrete, setPreviewUrlEncabezadoMembrete] = useState(null);
    const [previewUrlPieMembrete, setPreviewUrlPieMembrete] = useState(null);
    const [previewUrlEscudo, setPreviewUrlEscudo] = useState(null);
 const router = useRouter()

  useEffect(() => {
    try {
        setMounted(true);

        if(localStorage.getItem("user")){

            setIsAuthenticated(true)
            getInstitucion()
            getDepartamentos()

        }
       const decoded:any = jwtDecode(localStorage.getItem('token')||"");
        setUser(decoded)

    } catch (error) {
        console.error("Error al obtener el token:", error);
        setIsAuthenticated(false);
        router.push("/login");
        return;
    }

  }, [])
 // evitar renderizado SSR


const getInstitucion = async ()  => {
          setIsLoading(true);
          setExito(false);

          await axios
              .get(`${URL_API}/api/v1/instituciones`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                  setExito(true);
                  setIsLoading(false);
                  const data = res.data.data;
                  setFormData(data)
                  getMunicipiosByDepartamento(data.departamento_id);
                  setIdDepartamento(data.departamento_id);
                  setIdMunicipio(data.municipio_id);
                  setPreviewUrlRector(data.firma_rector);
                  setPreviewUrlAuxiliar(data.firma_auxiliar);
                  setPreviewUrlEncabezadoMembrete(data.encabezado_membrete);
                  setPreviewUrlPieMembrete(data.pie_membrete);
                  setPreviewUrlEscudo(data.escudo);

              })
              .catch((err) => {
                  setIsLoading(false);
                  console.error(err);
                  toast.error(
                      `${
                          err.response?.status ===401?'Sesión expirada': err.response?.data?.message || "No se logró la acción"
                      }`
                  );
                  if(err.response?.status === 401){
                      localStorage.removeItem("token");
                      localStorage.removeItem("token_type");
                      localStorage.removeItem("user");
                      setIsAuthenticated(false);
                      router.push("/login");
                  }

              });
      };

const getDepartamentos = async ()  => {
          setIsLoading(true);
          setExito(false);

          await axios
              .get(`${URL_API}/api/v1/departamentos`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                  setExito(true);
                  setIsLoading(false);
                  const data = res.data.data;
                  const departamentoOptions = data.map((dep:any) => ({
                    label: dep.departamento,             // Lo que se muestra
                    value: dep.id_departamento           // Lo que se guarda (número o string)
                    }));
                  setDepartamentos(departamentoOptions);

              })
              .catch((err) => {
                setMunicipios([]);
                setDepartamentos([]);
                  setIsLoading(false);
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
                  if(err.response?.status === 401){
                      localStorage.removeItem("token");
                      localStorage.removeItem("token_type");
                      localStorage.removeItem("user");
                      setIsAuthenticated(false);
                      router.push("/login");
                  }

              });
      };

      const getMunicipiosByDepartamento = async (id_departamento:any)  => {
          setIsLoading(true);
          setExito(false);

          await axios
              .get(`${URL_API}/api/v1/municipios?departamento_id=${id_departamento}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                  setExito(true);
                  setIsLoading(false);
                  const data = res.data.data;
                  const municipioOptions = data.map((mun:any) => ({
                    label: mun.municipio,             // Lo que se muestra
                    value: mun.id_municipio           // Lo que se guarda (número o string)
                    }));
                  setMunicipios(municipioOptions);

              })
              .catch((err) => {
                setMunicipios([]);
                  setIsLoading(false);
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
                  if(err.response?.status === 401){
                      localStorage.removeItem("token");
                      localStorage.removeItem("token_type");
                      localStorage.removeItem("user");
                      setIsAuthenticated(false);
                      router.push("/login");
                  }

              });
      };

const handleFileUploadRector = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file && file.size > 1024 * 1024) { // 1MB
    toast.error("El archivo es demasiado grande. El tamaño máximo permitido es 1MB.");
    return;
  }
  else if (file && !file.type.startsWith("image/")) {
    toast.error("El archivo debe ser una imagen.");
    return;
  }

  const formDa = new FormData();
  formDa.append('file', file);

  setIsLoading(true);
  setExito(false);

  try {
    const res = await axios.post(`${URL_API}/api/v1/upload`, formDa, {
      headers: {
        "Content-Type": "multipart/form-data", // ✅ Importante: esto permite subir archivos
        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
      },
    });

    const data = res.data;
    setPreviewUrlRector(data.url);
    setFormData({
        ...formData,
        firma_rector: data.url
        });
    setExito(true);

    toast.success("La imagen se ha subido correctamente");
  } catch (err: any) {
    setPreviewUrlRector(null);
    toast.error(
      err.response?.status === 401
        ? "Sesión expirada"
        : err.response?.data?.message || "No se logró la acción")
  } finally {
    setIsLoading(false);
  }
};

const handleFileUploadAuxiliar = async (e: any) => {
  const file = e.target.files[0];
if (!file) return;
  if (file && file.size > 1024 * 1024) { // 1MB
    toast.error("El archivo es demasiado grande. El tamaño máximo permitido es 1MB.");
    return;
  }
  else if (file && !file.type.startsWith("image/")) {
    toast.error("El archivo debe ser una imagen.");
    return;
  }
  const formDa = new FormData();
  formDa.append('file', file);

  setIsLoading(true);
  setExito(false);

  try {
    const res = await axios.post(`${URL_API}/api/v1/upload`, formDa, {
      headers: {
        "Content-Type": "multipart/form-data", // ✅ Este debe ser multipart/form-data
        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
      },
    });

    setExito(true);
    const data = res.data;
    setPreviewUrlAuxiliar(data.url);
    setFormData({
        ...formData,
        firma_auxiliar: data.url
        });
    toast.success(`La imagen se ha subido correctamente`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "light",
    });
  } catch (err: any) {
    setPreviewUrlAuxiliar(null);
    toast.error(
      `${err.response?.status === 401
        ? 'Sesión expirada'
        : err.response?.data?.message || "No se logró la acción"
      }`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      }
    );
  } finally {
    setIsLoading(false);
  }
};

const handleFileUploadEscudo = async (e: any) => {
  const file = e.target.files[0];
if (!file) return;
  if (file && file.size > 1024 * 1024*2) { // 2MB
    toast.error("El archivo es demasiado grande. El tamaño máximo permitido es 2MB.");
    return;
  }
  else if (file && !file.type.startsWith("image/")) {
    toast.error("El archivo debe ser una imagen.");
    return;
  }
  const formDa = new FormData();
  formDa.append('file', file);

  setIsLoading(true);
  setExito(false);

  try {
    const res = await axios.post(`${URL_API}/api/v1/upload`, formDa, {
      headers: {
        "Content-Type": "multipart/form-data", // ✅ Este debe ser multipart/form-data
        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
      },
    });

    setExito(true);
    const data = res.data;
    setPreviewUrlEscudo(data.url);
    setFormData({
        ...formData,
        escudo: data.url
        });
    toast.success(`La imagen se ha subido correctamente`);
  } catch (err: any) {
    setPreviewUrlEscudo(null);
    toast.error(
      `${err.response?.status === 401
        ? 'Sesión expirada'
        : err.response?.data?.message || "No se logró la acción"
      }`
    );
  } finally {
    setIsLoading(false);
  }
};
const handleFileUploadEncabezado = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 1024 * 1024) {
    toast.error("El archivo es demasiado grande. El tamaño máximo permitido es 1MB.");
    return;
  }

  if (!file.type.startsWith("image/")) {
    toast.error("El archivo debe ser una imagen.");
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  const img = new Image();
  img.src = objectUrl;

  img.onload = async () => {
    const height = img.naturalHeight;

    URL.revokeObjectURL(objectUrl); // Limpieza

    if (height > 150) {
      toast.error("La imagen debe tener una altura máxima de 150px.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('file', file);

    setIsLoading(true);
    setExito(false);

    try {
      const res = await axios.post(`${URL_API}/api/v1/upload`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
        },
      });

      const data = res.data;
      setPreviewUrlEncabezadoMembrete(data.url);
      setFormData(prev => ({
        ...formData,
        encabezado_membrete: data.url
      }));
      setExito(true);

      toast.success("La imagen se ha subido correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      });
    } catch (err: any) {
      setPreviewUrlEncabezadoMembrete(null);
      toast.error(
        `${err.response?.status === 401
          ? 'Sesión expirada'
          : err.response?.data?.message || "No se logró la acción"
        }`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "light",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };
};

const handleFileUploadPie = async (e: any) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Validar tipo
  if (!file.type.startsWith("image/")) {
    toast.error("El archivo debe ser una imagen.");
    return;
  }

  // Validar tamaño
  if (file.size > 1024 * 1024) {
    toast.error("El archivo es demasiado grande. El tamaño máximo permitido es 1MB.");
    return;
  }

  // Validar dimensiones
  const objectUrl = URL.createObjectURL(file);
  const isValidHeight = await new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const height = img.naturalHeight;
      URL.revokeObjectURL(objectUrl);

      if (height > 80) {
        toast.error("La imagen debe tener una altura máxima de 80px.");
        resolve(false);
      } else {
        resolve(true);
      }
    };
    img.onerror = () => {
      toast.error("No se pudo procesar la imagen.");
      URL.revokeObjectURL(objectUrl);
      resolve(false);
    };
    img.src = objectUrl;
  });

  if (!isValidHeight) return;

  // Si todo bien, subir archivo
  const formDa = new FormData();
  formDa.append('file', file);

  setIsLoading(true);
  setExito(false);

  try {
    const res = await axios.post(`${URL_API}/api/v1/upload`, formDa, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
      },
    });

    const data = res.data;
    setExito(true);
    setPreviewUrlPieMembrete(data.url);
    setFormData((prev: any) => ({
      ...formData,
      pie_membrete: data.url,
    }));

    toast.success("La imagen se ha subido correctamente", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "light",
    });
  } catch (err: any) {
    setPreviewUrlPieMembrete(null);
    toast.error(
      `${err.response?.status === 401
        ? "Sesión expirada"
        : err.response?.data?.message || "No se logró la acción"
      }`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      }
    );
  } finally {
    setIsLoading(false);
  }
};

const handleBorrarArchivo = async (filename: any) => {

if (!filename) return;


  setIsLoading(true);
  setExito(false);

  try {
    const res = await axios.delete(`${URL_API}/api/v1/deleteFile`, {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
      },
      data: {
        filename: filename,
        },
    });

    setExito(true);
    const data = res.data;

    toast.success(`La imagen se ha eliminado correctamente`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "light",
    });
  } catch (err: any) {
    setPreviewUrlAuxiliar(null);
    toast.error(
      `${err.response?.status === 401
        ? 'Sesión expirada'
        : err.response?.data?.message || "No se logró la acción"
      }`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      }
    );
  } finally {
    setIsLoading(false);
  }
};

const handleSaveInstitucion = async (e: any) => {
if (!formData) return;
    if (!formData.nombre || !formData.nombre_corto || !formData.nit || !formData.direccion || !formData.barrio) {
        toast.error("Por favor, complete todos los campos obligatorios.");
        return;
    }
    if (!idDepartamento || !idMunicipio) {
        toast.error("Por favor, seleccione un departamento y municipio.");
        return;
    }
  setIsLoading(true);
  setExito(false);

  try {
    const res = await axios.post(`${URL_API}/api/v1/instituciones`, formData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
      },
    });

    setExito(true);
    const data = res.data;

    toast.success(`Datos guardados correctamente`);
  } catch (err: any) {
    toast.error(
      `${err.response?.status === 401
        ? 'Sesión expirada'
        : err.response?.data?.message || "No se logró la acción"
      }`
    );
  } finally {
    setIsLoading(false);
  }
};








if (!mounted) return null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
      {/* Top Navigation Bar */}
                  <ToastContainer />

      <TopMenu/>
    {!isAuthenticated || isLoading && <Loading/>}
      {/* Main Content */}
      <main className="flex-1 ">
        {/* Page Header */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-white/20 px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {activeTab === "home" && "Inicio"}
                {activeTab === "parametros" && "Parametrización del Sistema"}
                {activeTab === "institucion" && "Datos Institucionales"}
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
                Información Básica del establecimiento educativo y sus parámetros generales.
              </p>
            </div>

            {/* Quick Action Button */}
<div className="flex items-center justify-between">
              <Button
                onClick={() => setActiveTab("institucion")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg mx-2"
              >
                <Building className="w-4 h-4 mr-2" />
                Institución
              </Button>
              <Button
                onClick={() => setActiveTab("parametros")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg mx-2"
              >
                <Settings2 className="w-4 h-4 mr-2" />
                Parámetros
              </Button>
</div>
          </div>
        </div>


              {/* institucion */}
              {activeTab === "institucion" && (
                <div className="space-y-6 ">
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
                        {!user?.role?.includes("ADMINISTRADOR","RECTOR") && <div className="bg-orange-100 text-red-800 p-2 rounded mb-4">
                            Solo el administrador o directivo rector puede cambiar estos datos.
                        </div>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          <div>
                            <Label htmlFor="institution-name">Nombre de la Institución</Label>
                            <Input onChange={
                                (e) => {
                                    setFormData({
                                        ...formData,
                                        nombre: e.target.value,
                                    });
                                    }
                            }    id="institution-name" defaultValue={formData?.nombre} className="uppercase" disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                          </div>
                          <div>
                            <Label htmlFor="academic-year">Nombre corto</Label>
                            <Input onChange={
                                (e) => {
                                    setFormData({
                                        ...formData,
                                        nombre_corto: e.target.value,
                                    });
                                    }
                            }     defaultValue={formData?.nombre_corto} className="uppercase" disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label>NIT</Label>
                                <Input onChange={
                                    (e) => {
                                        setFormData({
                                            ...formData,
                                            nit: e.target.value,
                                        });
                                        }
                                }     placeholder="Ej:000000000-0" defaultValue={formData?.nit} max={20}  disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                            </div>
                            <div>
                                <Label>Código DANE</Label>
                                <Input onChange={
                                    (e) => {
                                        setFormData({
                                            ...formData,
                                            codigo_dane: e.target.value,
                                        });
                                        }
                                }     placeholder="000000000" max={20} defaultValue={formData?.codigo_dane}  disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                            </div>
                            <div>
                                <Label>Código ICFES</Label>
                                <Input onChange={
                                    (e) => {
                                        setFormData({
                                            ...formData,
                                            codigo_icfes: e.target.value,
                                        });
                                        }
                                }     placeholder="000000000" max={20} defaultValue={formData?.codigo_icfes}  disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="institution-address">Dirección sede principal</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                direccion: e.target.value,
                                            });
                                            }
                                    }     id="institution-address" defaultValue={formData?.direccion} placeholder="Calle 123 # 45-67" disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                                <div>
                                    <Label htmlFor="institution-barr">Barrio sede principal</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                barrio: e.target.value,
                                            });
                                            }
                                    }     id="institution-address" defaultValue={formData?.barrio} placeholder="Nombre del barrio" disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                            </div>
                            <div>
                            <Label htmlFor="institution-name">Departamento</Label>
                            <Select
                                isDisabled={isLoading || !user?.role?.includes("ADMINISTRADOR","RECTOR")}
                                options={departamentos}
                                value={departamentos.find((opt:any) => String(opt.value) === String(idDepartamento))}
                                onChange={(selectedOption:any) => {
                                    if(!selectedOption) {
                                        setIdDepartamento(undefined)
                                        setMunicipios([])
                                        setIdMunicipio(undefined)
                                        setFormData({
                                        ...formData,
                                        departamento_id: null,
                                        });
                                    }else{
                                        setFormData({
                                        ...formData,
                                        departamento_id: selectedOption?.value,
                                        municipio_id: null,
                                        });
                                        setIdDepartamento(selectedOption?.value)
                                        setIdMunicipio(undefined)
                                        setMunicipios([]);
                                        getMunicipiosByDepartamento(selectedOption?.value)}
                                    }
                                }
                                placeholder="Seleccione un departamento"
                                isSearchable={true}
                                isClearable={true}
                                />
                          </div>
                          <div>
                            <Label htmlFor="institution-name">Municipio</Label>
                            <Select
                                isDisabled={isLoading || !idDepartamento ||!user?.role?.includes("ADMINISTRADOR","RECTOR")}
                                options={municipios}
                                value={idMunicipio?municipios.find((opt:any) => String(opt.value) === String(idMunicipio)): null}
                                onChange={(selectedOption:any) => {
                                if(!selectedOption) {
                                    setIdMunicipio(undefined)
                                    setFormData({
                                        ...formData,
                                        municipio_id: null,
                                        });
                                 }else{
                                    setIdMunicipio(selectedOption?.value)
                                    setFormData({
                                        ...formData,
                                        municipio_id: selectedOption?.value,
                                        });
                                    }
                                }

                                }
                                placeholder="Seleccione un municipio"
                                isSearchable={true}
                                isClearable={true}
                                />
                          </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="institution-address">Zona</Label>
                                    <Select
                                isDisabled={isLoading || !user?.role?.includes("ADMINISTRADOR","RECTOR")}
                                options={[
                                    { label: "URBANA", value: "URBANA" },
                                    { label: "RURAL", value: "RURAL" }
                                ]}
                                value={formData?[
                                    { label: "URBANA", value: "URBANA" },
                                    { label: "RURAL", value: "RURAL" }
                                ].find((opt:any) => String(opt.value) === formData?.zona): formData.zona ? { label: formData.zona, value: formData.zona } : null}

                                onChange={(selectedOption:any) => {

                                        setFormData({
                                        ...formData,
                                        zona: selectedOption.value,
                                        });

                                }}
                                placeholder="Seleccione una zona"
                                isSearchable={true}
                                isClearable={true}
                                />
                                </div>
                                <div>
                                    <Label htmlFor="institution-address">Sector</Label>
                                    <Select
                                isDisabled={isLoading || !user?.role?.includes("ADMINISTRADOR","RECTOR")}
                                options={[
                                    { label: "PRIVADO", value: "PRIVADO" },
                                    { label: "OFICIAL", value: "OFICIAL" }
                                ]}
                                value={formData?[
                                   { label: "PRIVADO", value: "PRIVADO" },
                                    { label: "OFICIAL", value: "OFICIAL" }
                                ].find((opt:any) => String(opt.value) === formData?.sector): formData.sector ? { label: formData.sector, value: formData.sector } : null}


                                onChange={(selectedOption:any) => {

                                        setFormData({
                                        ...formData,
                                        sector: selectedOption.value,
                                        });

                                }}
                                placeholder="Seleccione una zona"
                                isSearchable={true}
                                isClearable={true}
                                />
                                </div>

                            </div>
                            <div>
                                    <Label htmlFor="institution-barr">Correo electrónico</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                correo: e.target.value,
                                            });
                                            }
                                    }     id="institution-address" type="email" defaultValue={formData?.correo} placeholder="Ingrese un correo" disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                            <div>
                                    <Label htmlFor="institution-barr">Teléfono</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                telefono: e.target.value,
                                            });
                                            }
                                    }     id="institution-address" defaultValue={formData?.telefono} type="tel" placeholder="Ingrese un teléfono" disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                                <div>
                                    <Label htmlFor="institution-barr">Sitio Web</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                web: e.target.value,
                                            });
                                            }
                                    }     id="institution-address" defaultValue={formData?.web} type="web" placeholder="Ingrese una URL" disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                            <div>
                                    <Label >Nombre del Rector(a)</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                nombre_rector: e.target.value,
                                            });
                                            }
                                    }       placeholder="Nombre completo" defaultValue={formData?.nombre_rector} disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                                <div>
                                    <Label htmlFor="institution-barr">Nombre de Auxiliar Administrativo</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                nombre_auxiliar: e.target.value,
                                            });
                                            }
                                    }     id="institution-address" defaultValue={formData?.nombre_auxiliar} placeholder="Ingrese un nombre completo" disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                            <div>
                                    <Label >Identificación del Rector(a)</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                cc_rector: e.target.value,
                                            });
                                            }
                                    }       placeholder="CC Rector(a)" defaultValue={formData?.cc_rector} disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                                <div>
                                    <Label htmlFor="institution-barr">Identificación de Auxiliar Administrativo</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                cc_auxiliar: e.target.value,
                                            });
                                            }
                                    }     id="institution-address" defaultValue={formData?.cc_auxiliar} placeholder="CC Auxiliar Administrativo" disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                            <div>
                                    <Label >Cargo a mostrar de Rector(a)</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                cargo_rector: e.target.value,
                                            });
                                            }
                                    }       placeholder="Rector" defaultValue={formData?.cargo_rector} disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                                <div>
                                    <Label htmlFor="institution-barr">Cargo de Auxiliar Administrativo</Label>
                                    <Input onChange={
                                        (e) => {
                                            setFormData({
                                                ...formData,
                                                cargo_auxiliar: e.target.value,
                                            });
                                            }
                                    }     id="institution-address"  defaultValue={formData?.cargo_auxiliar} placeholder="Auxiliar Administrativo" disabled={isLoading ||!user?.role?.includes("ADMINISTRADOR","RECTOR")} />
                                </div>
                                <div>
                                     <img
                                        src={previewUrlRector?URL_API+previewUrlRector: "./icono.svg"}
                                        alt="Logo de la Institución"
                                        className="h-32 w-full object-contain rounded-lg border bg-gray-100"   />
                                        {previewUrlRector && <Delete className="w-8 h-8 mr-2 cursor-pointer text-red-500" onClick={(e)=>{
                                            e.preventDefault();
                                            handleBorrarArchivo(previewUrlRector);
                                            setFormData({
                                                ...formData,
                                                firma_rector: null,
                                            });
                                            setPreviewUrlRector(null);

                                        }} />}
                                </div>
                                <div>
                                     <img
                                        src={previewUrlAuxiliar?URL_API+previewUrlAuxiliar : "./icono.svg"}
                                        alt="Logo de la Institución"
                                        className="h-32 w-full object-contain rounded-lg border bg-gray-100"   />
                                        {previewUrlAuxiliar && <Delete className="w-8 h-8 mr-2 cursor-pointer text-red-500" onClick={(e)=>{
                                            e.preventDefault();
                                            handleBorrarArchivo(previewUrlAuxiliar);
                                            setFormData({
                                                ...formData,
                                                firma_auxiliar: null,
                                            });
                                            setPreviewUrlAuxiliar(null);

                                        }} />}
                                </div>
                                <div>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Seleccionar archivo firma rector(a)</span>
                                        <input
                                            type="file"

                                            className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                                onChange={
                                        (e:any) => {
                                            handleFileUploadRector(e);
                                            /*const file = e.target.files[0];
                                            if (file) {
                                                setFormData({
                                                    ...formData,
                                                    firma_rector: file,
                                                });

                                                setPreviewUrlRector(URL.createObjectURL(file));
                                                }
                                            */
                                            }
                                    }
                                        />
                                        </label>

                                </div>
                                <div>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Seleccionar archivo firma auxiliar</span>
                                        <input
                                            type="file"

                                            className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                                onChange={
                                        (e:any) => {
                                            handleFileUploadAuxiliar(e);
                                            /*
                                            const file = e.target.files[0];
                                            if (file) {
                                                setFormData({
                                                    ...formData,
                                                    firma_auxiliar: file,
                                                });

                                                setPreviewUrlAuxiliar(URL.createObjectURL(file));
                                                }
                                                */
                                            }
                                    }
                                        />
                                        </label>

                                </div>
                                <div>
                                     <img
                                        src={previewUrlEncabezadoMembrete?URL_API+previewUrlEncabezadoMembrete: "./icono.svg"}
                                        alt="Logo de la Institución"
                                        className="h-32 w-full object-contain rounded-lg border bg-gray-100"   />
                                        {previewUrlEncabezadoMembrete && <Delete className="w-8 h-8 mr-2 cursor-pointer text-red-500" onClick={(e)=>{
                                            e.preventDefault();
                                            handleBorrarArchivo(previewUrlEncabezadoMembrete);
                                            setFormData({
                                                ...formData,
                                                encabezado_membrete: null,
                                            });
                                            setPreviewUrlEncabezadoMembrete(null);

                                        }} />}
                                </div>
                                <div>
                                     <img
                                        src={previewUrlPieMembrete?URL_API+previewUrlPieMembrete : "./icono.svg"}
                                        alt="Logo de la Institución"
                                        className="h-32 w-full object-contain rounded-lg border bg-gray-100"   />
                                        {previewUrlPieMembrete && <Delete className="w-8 h-8 mr-2 cursor-pointer text-red-500" onClick={(e)=>{
                                            e.preventDefault();
                                            handleBorrarArchivo(previewUrlPieMembrete);
                                            setFormData({
                                                ...formData,
                                                pie_membrete: null,
                                            });
                                            setPreviewUrlPieMembrete(null);

                                        }} />}
                                </div>
                                <div>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Seleccionar archivo emcabezado de página 150px de alto</span>
                                        <input
                                            type="file"

                                            className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                                onChange={
                                        (e:any) => {
                                            handleFileUploadEncabezado(e);
                                            /*const file = e.target.files[0];
                                            if (file) {
                                                setFormData({
                                                    ...formData,
                                                    firma_rector: file,
                                                });

                                                setPreviewUrlRector(URL.createObjectURL(file));
                                                }
                                            */
                                            }
                                    }
                                        />
                                        </label>

                                </div>
                                <div>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Seleccionar archivo pie de página 80px de alto</span>
                                        <input
                                            type="file"

                                            className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                                onChange={
                                        (e:any) => {
                                            handleFileUploadPie(e);
                                            /*
                                            const file = e.target.files[0];
                                            if (file) {
                                                setFormData({
                                                    ...formData,
                                                    firma_auxiliar: file,
                                                });

                                                setPreviewUrlAuxiliar(URL.createObjectURL(file));
                                                }
                                                */
                                            }
                                    }
                                        />
                                        </label>

                                </div>
                                <div>
                                     <img
                                        src={previewUrlEscudo?URL_API+previewUrlEscudo : "./icono.svg"}
                                        alt="Logo de la Institución"
                                        className="h-32 w-full object-contain rounded-lg border bg-gray-100"   />
                                        {previewUrlEscudo && <Delete className="w-8 h-8 mr-2 cursor-pointer text-red-500" onClick={(e)=>{
                                            e.preventDefault();
                                            handleBorrarArchivo(previewUrlEscudo);
                                            setFormData({
                                                ...formData,
                                                escudo: null,
                                            });
                                            setPreviewUrlEscudo(null);

                                        }} />}
                                </div>
                                <div>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Seleccionar archivo del escudo</span>
                                        <input
                                            type="file"

                                            className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                                onChange={
                                        (e:any) => {
                                            handleFileUploadEscudo(e);
                                            /*const file = e.target.files[0];
                                            if (file) {
                                                setFormData({
                                                    ...formData,
                                                    firma_rector: file,
                                                });

                                                setPreviewUrlRector(URL.createObjectURL(file));
                                                }
                                            */
                                            }
                                    }
                                        />
                                        </label>

                                </div>



                        </div>

                        <Button
                            onClick={handleSaveInstitucion}
                            className="sticky bottom-5 right-5 z-50 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg rounded-full px-4 py-2"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Guardar cambios
                        </Button>

                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}



            {/* Pareametros */}
            {activeTab === "parametros" && (
              <div className="space-y-6">
                <div className="grid gap-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-slate-500 rounded-lg flex items-center justify-center">
                          <Settings className="w-4 h-4 text-white" />
                        </div>
                        Parámetros Generales
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



        </main>
      </div>
    )
}
