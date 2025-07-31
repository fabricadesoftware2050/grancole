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
  Trash,
  CheckIcon,
  Blocks,
  Info,
  SkipBackIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import NotificacionesComponent from "@/components/ui/NotificacionesComponent"

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { URL_API } from "@/lib/utils"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import TopMenu from "@/components/ui/TopMenu";
import { useRouter } from "next/navigation"
import Loading from "@/components/ui/loading"
import { jwtDecode } from "jwt-decode";
import { Textarea } from "@/components/ui/textarea";

export default function Index() {
      const [mounted, setMounted] = useState(false);

  const [activeTab, setActiveTab] = useState("institucion")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({visible:1,afecta_promocion:1,visible_en_informes:1})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [exito, setExito] = useState(false)
  const [institucion, setInstitucion] = useState()
  const [user, setUser] = useState()
  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [idAreaFundamental, setIdAreaFundamental] = useState()
  const [idAreaAcademica, setIdAreaAcademica] = useState()
  const [idMunicipio, setIdMunicipio] = useState()

  const [previewUrlMalla, setPreviewUrlMalla] = useState(null);
      const [previewUrlPlan, setPreviewUrlPlan] = useState(null);




    const [areasFundamentales, setAreasFundamentales] = useState([]);
    const [areas, setAreas] = useState([]);
    const [areasCBO, setAreasCBO] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
    const [notificacion, setNotificacion] = useState();
  const [showFormArea, setShowFormArea] = useState(false);
  const [showFormAsignatura, setShowFormAsignatura] = useState(false);

  const handleFileUploadMalla = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!formData?.nombre) {
      toast.error("Asigne un nombre a la asignatura");
      return;
    }
    if (file && file.size > 1024 * 1024*5) { // 5MB
      toast.error("El archivo es demasiado grande. El tamaño máximo permitido es 5MB.");
      return;
    }
    else if (file && !file.type.startsWith("application/pdf") && !file.type.startsWith("image/")) {
      toast.error("El archivo debe ser una imagen o un pdf.");
      return;
    }

    const formDa = new FormData();
    formDa.append('file', file);
    formDa.append('filename', formData.nombre);

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
      setPreviewUrlMalla(data.url);
      setFormData({
          ...formData,
          malla: data.url
          });
      setExito(true);

      toast.success("La malla se ha subido correctamente");
    } catch (err: any) {
      setPreviewUrlMalla(null);
      toast.error(
        err.response?.status === 401
          ? "Sesión expirada"
          : err.response?.data?.message || "No se logró la acción")
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUploadPlan = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!formData?.nombre) {
      toast.error("Asigne un nombre a la asignatura");
      return;
    }
    if (file && file.size > 1024 * 1024*5) { // 5MB
      toast.error("El archivo es demasiado grande. El tamaño máximo permitido es 5MB.");
      return;
    }
    else if (file && !file.type.startsWith("application/pdf") && !file.type.startsWith("image/")) {
      toast.error("El archivo debe ser una imagen o un pdf.");
      return;
    }

    const formDa = new FormData();
    formDa.append('file', file);
    formDa.append('filename', formData.nombre);

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
      setPreviewUrlPlan(data.url);
      setFormData({
          ...formData,
          plan_area: data.url
          });
      setExito(true);

      toast.success("El plan de área se ha subido correctamente");
    } catch (err: any) {
      setPreviewUrlMalla(null);
      toast.error(
        err.response?.status === 401
          ? "Sesión expirada"
          : err.response?.data?.message || "No se logró la acción")
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmitArea = async(e:any) => {
    e.preventDefault()

    if (!formData.nombre || !formData.area_fundamental_id) {
        toast.error("Por favor, complete todos los campos obligatorios.");
        return;
    }

  setIsLoading(true);
  setExito(false);

  try {
    const res = await axios.post(`${URL_API}/api/v1/areasAcademicas`, formData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
      },
    });

    setExito(true);
    const data = res.data;
    setAreas(data.data)
    const setOptions = data.data.map((data:any) => ({
                    label: `${data.nombre}`,             // Lo que se muestra
                    value: data.id           // Lo que se guarda (número o string)
                    }));
    setAreasCBO(setOptions);
    setFormData({visible:1,afecta_promocion:1})
    toast.success(`Datos guardados correctamente`);
    setShowFormArea(false);
  } catch (err: any) {
    console.log(err)
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

const handleSubmitAsignatura = async(e:any) => {
    e.preventDefault()

    if (!formData.nombre || !formData.area_academica_id) {
        toast.error("Por favor, complete todos los campos obligatorios.");
        return;
    }

  setIsLoading(true);
  setExito(false);

  try {
    const res = await axios.post(`${URL_API}/api/v1/asignaturas`, formData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
      },
    });

    setExito(true);
    const data = res.data;
    setAsignaturas(data.data)
    setFormData({visible:1,afecta_promocion:1,visible_en_informes:1})
    setIdAreaAcademica(undefined)
    toast.success(`Datos guardados correctamente`);
    setShowFormAsignatura(false);
  } catch (err: any) {
    console.log(err)
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
const handleBorrarArea = async(id:any) => {
  setIsLoading(true);
  setExito(false);

  try {
    const res = await axios.delete(`${URL_API}/api/v1/areasAcademicas/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
      },
    });

    setExito(true);
    const data = res.data;
    setAreas(data.data)
    setFormData({visible:1,afecta_promocion:1})
    const setOptions = data.data.map((data:any) => ({
                    label: `${data.nombre}`,             // Lo que se muestra
                    value: data.id           // Lo que se guarda (número o string)
                    }));
    setAreasCBO(setOptions);
    toast.success(`Datos eliminados correctamente`);
    setShowFormArea(false);
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
const handleBorrarAsignatura = async(id:any) => {
  setIsLoading(true);
  setExito(false);

  try {
    const res = await axios.delete(`${URL_API}/api/v1/asignaturas/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
      },
    });

    setExito(true);
    const data = res.data;
    setAsignaturas(data.data)
    setFormData({visible:1,afecta_promocion:1,visible_en_informes:1})

    toast.success(`Datos eliminados correctamente`);
    setShowFormAsignatura(false);
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
 const router = useRouter()

  useEffect(() => {
    try {
        setMounted(true);

        if(localStorage.getItem("user")){

            setIsAuthenticated(true)
           getAreasFundamentales()
           getAreasAcademicas()
           getAsignaturas()

        }
        if(!formData){
            setNotificacion({tipo:'danger',titulo:"Configuración necesaria",mensaje:'Algunos datos de la institución no han sido completados.'})
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



const getAreasFundamentales = async ()  => {
          setIsLoading(true);
          setExito(false);

          await axios
              .get(`${URL_API}/api/v1/areasFundamentales`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                  setExito(true);
                  setIsLoading(false);
                  const data = res.data.data;
                  const setOptions = data.map((data:any) => ({
                    label: `${data.nombre}`,             // Lo que se muestra
                    value: data.id           // Lo que se guarda (número o string)
                    }));
                  setAreasFundamentales(setOptions);

              })
              .catch((err) => {
                setAreasFundamentales([]);
                  setIsLoading(false);
                  console.error(err);
                  toast.error(
                      `${
                          err.response?.status ===401?'Sesión expirada': err.response?.data?.message || "No se logró la acción"
                      }`);
                  if(err.response?.status === 401){
                      localStorage.removeItem("token");
                      localStorage.removeItem("token_type");
                      localStorage.removeItem("user");
                      setIsAuthenticated(false);
                      router.push("/login");
                  }

              });
      };

      const getAreasAcademicas = async ()  => {
          setIsLoading(true);
          setExito(false);

          await axios
              .get(`${URL_API}/api/v1/areasAcademicas`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                  setExito(true);
                  setIsLoading(false);
                  const data = res.data.data;
                const setOptions = data.map((data:any) => ({
                    label: `${data.nombre}`,             // Lo que se muestra
                    value: data.id           // Lo que se guarda (número o string)
                    }));
                  setAreasCBO(setOptions);
                  setAreas(data);

              })
              .catch((err) => {
                setAreas([]);
                  setIsLoading(false);
                  console.error(err);
                  toast.error(
                      `${
                          err.response?.status ===401?'Sesión expirada': err.response?.data?.message || "No se logró la acción"
                      }`);
                  if(err.response?.status === 401){
                      localStorage.removeItem("token");
                      localStorage.removeItem("token_type");
                      localStorage.removeItem("user");
                      setIsAuthenticated(false);
                      router.push("/login");
                  }

              });
      };
      const getAsignaturas = async ()  => {
          setIsLoading(true);
          setExito(false);

          await axios
              .get(`${URL_API}/api/v1/asignaturas`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                  setExito(true);
                  setIsLoading(false);
                  const data = res.data.data;

                  setAsignaturas(data);

              })
              .catch((err) => {
                setAsignaturas([]);
                  setIsLoading(false);
                  console.error(err);
                  toast.error(
                      `${
                          err.response?.status ===401?'Sesión expirada': err.response?.data?.message || "No se logró la acción"
                      }`);
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
<main className="flex-1 overflow-x-auto w-full">


              {/* lista */}

                <div className="space-y-6 pb-32 relative">
                    <div className="grid gap-6">
                        {/* Bloque principal: Datos y Escudo */}
                        <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-blue-50 to-indigo-100/80 backdrop-blur-md">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center shadow">
                                        <Settings className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-2xl lg:text-3xl text-indigo-900">Configuración de Áreas y Asignaturas</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {!user?.role?.includes("ADMINISTRADOR", "RECTOR", "COORDINADOR") && (
                                    <div className="bg-orange-100 border border-orange-300 text-orange-900 p-3 rounded-lg text-xs">
                                        Solo el administrador o directivo rector puede cambiar estos datos.
                                    </div>
                                )}
                                {notificacion && (
                                    <NotificacionesComponent notificacion={notificacion} setNotificacion={setNotificacion} />
                                )}

                                <div className="p-4 sm:p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-800">Áreas</h2>
        <button  onClick={() => {
            setShowFormArea(!showFormArea)
            if(showFormArea){
                setIdAreaFundamental(undefined)
                setFormData({visible:1,afecta_promocion:1})
            }
        }} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded shadow hover:bg-blue-800">
          {!showFormArea?<Plus className="w-4 h-4" />:<SkipBackIcon className="w-4 h-4" />} {!showFormArea?'Agregar Área':'Cancelar'}
        </button>
      </div>

            {showFormArea && (
                <form className="bg-blue-50 p-4 rounded-lg shadow space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-6">
                    <Label className="text-xs text-indigo-700">Área fundamental a la que pertenece (Ley 115 de 1994) *</Label>
                    <Select
                        options={areasFundamentales}
                        isDisabled={isLoading || !user?.role?.includes("ADMINISTRADOR","RECTOR","COORDINADOR")}
                        value={areasFundamentales.find((opt) => String(opt.value) === String(idAreaFundamental))}
                        onChange={(selectedOption) => {
                        if (!selectedOption) {
                            setIdAreaFundamental(undefined);
                            setFormData({ ...formData, area_fundamental_id: null });
                        } else {
                            setFormData({ ...formData, area_fundamental_id: selectedOption.value });
                            setIdAreaFundamental(selectedOption.value);
                        }
                        }}
                        placeholder="Área fundamental"
                        isSearchable={true}
                        isClearable={true}
                        styles={{
                        control: (base) => ({ ...base, minHeight: 32, borderColor: "#6366f1" }),
                        input: (base) => ({ ...base, fontSize: 12 }),
                        }}
                    />
                    </div>

                    <div className="md:col-span-5">
                    <Label className="text-xs text-indigo-700">Nombre del Área *</Label>
                    <Input
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        value={formData.nombre}
                        placeholder="Ej: Ciencias Sociales"
                        className="uppercase text-xs bg-white/80 border-indigo-200 focus:border-indigo-400"
                    />
                    </div>

                    <div className="md:col-span-1">
                        <Label className="text-xs text-indigo-700">Orden </Label>
                        <Input
                        maxLength={2}
                        onChange={(e) => setFormData({ ...formData, orden: e.target.value })}
                        value={formData.orden}
                        placeholder="Ej: 1"
                        className="text-xs bg-white/80 border-indigo-200 focus:border-indigo-400"
                        />

                    </div>
                    <div className="md:col-span-12">
                    <Label className="text-xs text-indigo-700">Descripción</Label>
                    <Textarea
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        value={formData.descripcion}
                        placeholder="Breve descripción del área..."
                        className="text-md bg-white/80 border-indigo-200 focus:border-indigo-400"
                    />
                    </div>

                    <div className="md:col-span-6">
                    <input
                    id="afecta_promocion"
                        type="checkbox"
                        checked={formData.afecta_promocion}
                        onChange={(e) => setFormData({ ...formData, afecta_promocion: e.target.checked })}
                    />
                    <label htmlFor="afecta_promocion" className="text-md text-indigo-700"> Afecta promoción</label>
                    </div>

                    <div className="md:col-span-6">
                    <input
                    id="visible"
                        type="checkbox"
                        checked={formData.visible}
                        onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                    />
                    <label htmlFor="visible"  className="text-md text-indigo-700"> Visible</label>
                    </div>

                </div>

                <div className="flex justify-center z-40 pointer-events-none">
                    <div className="w-full max-w-2xl mx-auto flex justify-center">
                        <Button
                            onClick={handleSubmitArea}
                            className="pointer-events-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl rounded-full px-8 py-3 text-base font-semibold mb-6"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            Guardar
                        </Button>
                    </div>
                </div>
                </form>
            )}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50 text-blue-800 text-left">
            <tr>
              <th className="p-3">Orden</th>
              <th className="p-3">Código</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Área (Ley 115 de 1994)</th>
              <th className="p-3">Afecta promoción</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (area?.visible || user?.role?.includes("ADMINISTRADOR","RECTOR","COORDINADOR")) &&(
              <tr key={area.id} className="border-b hover:bg-gray-50 uppercase">
                <td className="p-3">{area.orden}</td>
                <td className="p-3">{area?.id.toString().length < 2 ? '0' + area.id : area.id}</td>
                <td className="p-3 font-bold" title={area?.descripcion??''}>{area.nombre}</td>
                <td className="p-3">{area.area_fundamental?.nombre}</td>
                <td className="p-3">{area.afecta_promocion ? <CheckIcon className="text-green-600" />:""}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800" onClick={(e)=>{
                    setIdAreaFundamental(area.area_fundamental_id)
                    setFormData(area)
                    setShowFormArea(true)
                    }} title="Editar"><Edit className="w-6 h-6" /></button>
                  <button className="text-red-600 hover:text-red-800"
                  onClick={(e)=>{
                    if(confirm('¿Realmente desea eliminar el item?')){
                        handleBorrarArea(area?.id)
                    }
                  }}
                   title="Eliminar"><Trash className="w-6 h-6" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-green-800">Asignaturas por Área</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded shadow hover:bg-green-800"
        onClick={() => {
            setShowFormAsignatura(!showFormAsignatura)
            if(showFormAsignatura){
                setIdAreaAcademica(undefined)
                setFormData({visible:1,afecta_promocion:1,evaluacion_comportamiento:0,visible_en_informes:1})
                setPreviewUrlMalla(undefined)
                setPreviewUrlPlan(undefined)
            }
        }}>
          {!showFormAsignatura?<Plus className="w-4 h-4" />:<SkipBackIcon className="w-4 h-4" />} {!showFormAsignatura?'Agregar Ásinatura':'Cancelar'}
        </button>
      </div>

      {showFormAsignatura && (
                <form className="bg-blue-50 p-4 rounded-lg shadow space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-6">
                    <Label className="text-xs text-indigo-700">Área a la que pertenece la asignatura *</Label>
                    <Select
                    className="uppercase"
                        options={areasCBO}
                        isDisabled={isLoading || !user?.role?.includes("ADMINISTRADOR","RECTOR","COORDINADOR")}
                        value={areasCBO.find((opt) => String(opt.value) === String(idAreaAcademica))}
                        onChange={(selectedOption) => {
                        if (!selectedOption) {
                            setIdAreaAcademica(undefined);
                            setFormData({ ...formData, area_academica_id: null });
                        } else {
                            setFormData({ ...formData, area_academica_id: selectedOption.value });
                            setIdAreaAcademica(selectedOption.value);
                        }
                        }}
                        placeholder="11 - PREESCOLAR"
                        isSearchable={true}
                        isClearable={true}
                        styles={{
                        control: (base) => ({ ...base, minHeight: 32, borderColor: "#6366f1" }),
                        input: (base) => ({ ...base, fontSize: 12 }),
                        }}
                    />
                    </div>

                    <div className="md:col-span-5">
                    <Label className="text-xs text-indigo-700">Nombre de la Asignatura *</Label>
                    <Input
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        value={formData.nombre}
                        placeholder="Ej: Ciencias Sociales"
                        className="uppercase text-xs bg-white/80 border-indigo-200 focus:border-indigo-400"
                    />
                    </div>

                    <div className="md:col-span-1">
                        <Label className="text-xs text-indigo-700">Orden </Label>
                        <Input
                        maxLength={2}
                        onChange={(e) => setFormData({ ...formData, orden: e.target.value })}
                        value={formData.orden}
                        placeholder="Ej: 1"
                        className="text-xs bg-white/80 border-indigo-200 focus:border-indigo-400"
                        />

                    </div>
                    <div className="md:col-span-12">
                    <Label className="text-xs text-indigo-700">Descripción</Label>
                    <Textarea
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        value={formData.descripcion}
                        placeholder="Breve descripción del área..."
                        className="text-md bg-white/80 border-indigo-200 focus:border-indigo-400"
                    />
                    </div>

                    <div className="md:col-span-4">
                    <input
                    id="afecta_promocion"
                        type="checkbox"
                        checked={formData.afecta_promocion}
                        onChange={(e) => setFormData({ ...formData, afecta_promocion: e.target.checked })}
                    />
                    <label htmlFor="afecta_promocion" className="text-md text-indigo-700"> Afecta promoción</label>
                    </div>

                    <div className="md:col-span-4">
                    <input
                    id="visible"
                        type="checkbox"
                        checked={formData.visible}
                        onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                    />
                    <label htmlFor="visible"  className="text-md text-indigo-700"> Visible a usuarios</label>
                    </div>
                    <div className="md:col-span-4">
                    <input
                    id="visible"
                        type="checkbox"
                        checked={formData.visible_en_informes}
                        onChange={(e) => setFormData({ ...formData, visible_en_informes: e.target.checked })}
                    />
                    <label htmlFor="visible"  className="text-md text-indigo-700"> Visible en informes</label>
                    </div>
                    <div className="md:col-span-6 bg-white">
                        <div className="flex flex-col items-center">

                            {previewUrlMalla && (
                                <div className="mt-4 border rounded-lg overflow-hidden shadow-sm">
                                    {previewUrlMalla.endsWith('.pdf') ? (
                                    <iframe
                                        src={URL_API + previewUrlMalla}
                                        title="Vista previa del archivo PDF"
                                        className="w-full h-[400px]"
                                    />
                                    ) : (
                                    <img
                                        src={URL_API + previewUrlMalla}
                                        alt="Vista previa de imagen"
                                        className="w-full max-h-[400px] object-contain"
                                    />
                                    )}
                                </div>
                                )}

                            <input
                                type="file"
                                className="mt-1 block w-full text-xs text-gray-500 file:py-1 file:px-2 file:rounded file:bg-indigo-50 file:text-indigo-700"
                                onChange={handleFileUploadMalla}
                                disabled={!formData?.nombre ||isLoading || !user?.role?.includes("ADMINISTRADOR","RECTOR","COORDINADOR")}
                            />
                            <span className="text-indigo-700 mt-1">PDF o Imagen de la malla (max 5MB)</span>
                        </div>
                    </div>
                    <div className="md:col-span-6 bg-white">
                        <div className="flex flex-col items-center">

                            {previewUrlPlan && (
                                <div className="mt-4 border rounded-lg overflow-hidden shadow-sm">
                                    {previewUrlPlan.endsWith('.pdf') || previewUrlPlan.endsWith('.PDF') ? (
                                    <iframe
                                        src={URL_API + previewUrlPlan}
                                        title="Vista previa del archivo PDF"
                                        className="w-full h-[400px]"
                                    />
                                    ) : (
                                    <img
                                        src={URL_API + previewUrlPlan}
                                        alt="Vista previa de imagen"
                                        className="w-full max-h-[400px] object-contain"
                                    />
                                    )}
                                </div>
                                )}

                            <input
                                type="file"
                                className="mt-1 block w-full text-xs text-gray-500 file:py-1 file:px-2 file:rounded file:bg-indigo-50 file:text-indigo-700"
                                onChange={handleFileUploadPlan}
                                disabled={!formData?.nombre ||isLoading || !user?.role?.includes("ADMINISTRADOR","RECTOR","COORDINADOR")}
                            />
                            <span className="text-indigo-700 mt-1">PDF o Imagen del plan de area (max 5MB)</span>
                        </div>
                    </div>

                </div>

                <div className="flex justify-center z-40 pointer-events-none">
                        <div className="w-full max-w-2xl mx-auto flex justify-center">
                            <Button
                                onClick={handleSubmitAsignatura}
                                className="pointer-events-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl rounded-full px-8 py-3 text-base font-semibold mb-6"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                Guardar
                            </Button>
                        </div>

                    </div>
                </form>
            )}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-green-50 text-green-800 text-left">
            <tr>
              <th className="p-3">Orden</th>
              <th className="p-3">Código</th>
              <th className="p-3">Asignatura</th>
              <th className="p-3">Área</th>
              <th className="p-3">Afecta promocion</th>
              <th className="p-3">Visible en informes</th>
              <th className="p-3">Malla Curricular</th>
              <th className="p-3">Plan de Área</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asignaturas.map((asig) => (
              <tr key={asig.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{asig.orden}</td>
                <td className="p-3">{asig.area_academica?.id.toString().length < 2 ? '0' +asig.area_academica?.id : asig.area_academica?.id}{asig?.id.toString().length < 2 ? '0' + asig?.id : asig?.id}</td>
                <td className="p-3 font-medium uppercase">{asig?.nombre}</td>
                <td className="p-3 font-medium uppercase">{asig?.area_academica?.nombre}</td>
                <td className="p-3">{asig.afecta_promocion? "✅" : "❌"}</td>
                <td className="p-3">{asig.visible_en_informes? "✅" : "❌"}</td>
                <td className="p-3">{asig.malla ? <Link className="underline text-blue-600" target="_blank" href={URL_API+asig.malla}>VER ARCHIVO</Link>:<span className="text-red-300 italic">Sin adjuntar</span>}</td>
                <td className="p-3">{asig.plan_area ? <Link className="underline text-blue-600" target="_blank" href={URL_API+asig.plan_area}>VER ARCHIVO</Link>:<span className="text-red-300 italic">Sin adjuntar</span>}</td>
                <td className="p-3 flex gap-2">
                 <button className="text-blue-600 hover:text-blue-800" onClick={(e)=>{
                    setIdAreaAcademica(asig.area_academica_id)
                    setFormData(asig)
                    setShowFormAsignatura(true)
                    setPreviewUrlMalla(asig.malla)
                    setPreviewUrlPlan(asig.plan_area)
                    }} title="Editar"><Edit className="w-6 h-6" /></button>
                  <button className="text-red-600 hover:text-red-800"
                  onClick={(e)=>{
                    if(confirm('¿Realmente desea eliminar el item?')){
                        handleBorrarAsignatura(asig?.id)
                    }
                  }}
                   title="Eliminar"><Trash className="w-6 h-6" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

                            </CardContent>
                        </Card>


                    </div>
                    {/* Botón flotante centrado abajo */}

                </div>




        </main>
      </div>
    )
}
