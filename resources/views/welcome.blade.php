<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grancole Pro - Iniciar Sesión</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
    <!-- Toastify CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('assets/img/icono.svg') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('assets/img/icono.svg') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('assets/img/icono.svg') }}">
    <link rel="manifest"href="{{ asset('assets/img/icono.svg') }}">
    <link rel="mask-icon" href="{{ asset('assets/img/icono.svg') }}" color="#ff2d20">
    <link rel="shortcut icon" href="{{ asset('assets/img/icono.svg') }}">
    <!-- Meta CSRF Token (Laravel debe tener esto en el head) -->
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>

<body class="bg-gray-100">

    <div class="min-h-screen flex flex-col lg:flex-row">
        <!-- IZQUIERDA -->
        <div class="w-full lg:w-1/2 flex flex-col justify-center px-10 py-12 text-white relative bg-gradient-to-br from-blue-600 to-indigo-700"
            style="background-image: url('https://www.elpais.com.co/resizer/v2/IVU27MUVT5FBFLHJHPDYI3GLBA.jpg?auth=42fa6325a8c5021b5c96003ef3c6004daad18a0f6c50ad9c374cfece4190bbfc&smart=true&quality=75&width=1280&height=720'); background-size: cover; background-position: center;">
            <canvas id="tsparticles" class="absolute inset-0 z-10 pointer-events-none"></canvas>

            <div class="absolute inset-0 bg-indigo-900 bg-opacity-70 z-0"></div>

            <div class="relative z-20 max-w-xl mx-auto text-center lg:text-left">

                <div class="flex items-center justify-center lg:justify-start gap-3 mb-6">
                    <div class="bg-white bg-opacity-10 p-2 rounded-xl">
                        <img class="w-8" src="{{ asset('assets/img/icono.svg') }}" alt="">
                    </div>
                    <div>
                        <h1 class="text-xl font-semibold">Grancole Pro</h1>
                        <p class="text-sm opacity-80">Sistema de Gestión Educativa</p>
                    </div>
                </div>

                <h2 class="text-3xl font-bold mb-4">Gestiona tu institución educativa de manera inteligente</h2>

                <p class="text-sm opacity-90 mb-6">
                    Plataforma integral para administrar estudiantes, profesores, calificaciones, asistencia y mucho más
                    en un solo lugar.
                </p>

                <ul class="space-y-3 text-sm mb-10">
                    <li class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                        Gestión completa de estudiantes y profesores
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                        Sistema de calificaciones y boletines
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                        Control de asistencia en tiempo real
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                        Comunicación integrada y foros
                    </li>
                </ul>

                <div class="flex justify-center lg:justify-start gap-10 text-white/90">
                    <div>
                        <p class="text-2xl font-semibold">{{ $estudiantes ?? '1,234+' }}</p>
                        <p class="text-xs">Estudiantes</p>
                    </div>
                    <div>
                        <p class="text-2xl font-semibold">{{ $cursos ?? '45+' }}</p>
                        <p class="text-xs">Cursos</p>
                    </div>
                    <div>
                        <p class="text-2xl font-semibold">98%</p>
                        <p class="text-xs">Calificaciones</p>
                    </div>
                </div>
            </div>


        </div>

        <!-- DERECHA / FORMULARIO -->
        <div id="app" class="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12">
            @include('partials.loading')
            <img src={{ $escudo ?? asset('assets/img/icono.svg') }} alt="Escudo Colegio"
                class="w-24 h-24 object-cover mb-6 rounded-full shadow-lg" />

            <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">{{ $institucion ?? 'Bienvenido a GranCole' }}
            </h2>
            <p class="text-sm text-gray-500 mb-6 text-center">Inicia sesión para continuar</p>

            <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

                <form @submit.prevent="login" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                        <div class="flex items-center border rounded-lg px-3">
                            <i class="fas fa-user text-gray-400 mr-2"></i>
                            <input type="text" v-model="usuario" placeholder="0000000"
                                class="w-full py-2 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <div class="flex items-center border rounded-lg px-3 relative">
                            <i class="fas fa-lock text-gray-400 mr-2"></i>

                            <input
                                :type="[
                                    [mostrarClave ? 'text' : 'password']
                                ]"
                                v-model="clave" placeholder="••••••••" class="w-full py-2 outline-none" />

                            <!-- Ícono de ojo a la derecha -->
                            <i :class="[
                                [mostrarClave ? 'fas fa-eye-slash' : 'fas fa-eye']
                            ]"
                                class="absolute right-3 text-gray-400 cursor-pointer"
                                @click="mostrarClave = !mostrarClave"></i>
                        </div>
                    </div>


                    <div class="flex items-center justify-between text-sm">
                        <span></span>
                        <a href="#" class="text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" :disabled="loading"
                        class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                        <span v-if="!loading">Iniciar Sesión →</span>
                        <span v-else class="flex items-center">
                            <i class="fas fa-spinner fa-spin mr-2"></i> Validando...
                        </span>
                    </button>
                </form>

                <div v-if="error" class="mt-4 text-sm text-red-500 text-center">[[ error ]]</div>
                <div v-if="exito" class="mt-4 text-sm text-green-600 text-center">✅ [[ 'Sesión iniciada correctamente'
                    ]]</div>

            </div>

        </div>




    </div>
    <!-- FOOTER -->
    <footer class="text-center text-sm text-white py-4 bg-blue-800">
        © 2025 Grancole Pro. Todos los derechos reservados. Diseñado por Agencia Cristal.
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <!-- Toastify JS -->
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

    <script src="https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js"></script>
    <script>
        window.addEventListener("load", () => {
            tsParticles.load("tsparticles", {
                background: {
                    color: {
                        value: "transparent"
                    }
                },
                fpsLimit: 60,
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            area: 800
                        }
                    },
                    color: {
                        value: "#fff"
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: 0.4
                    },
                    size: {
                        value: {
                            min: 1,
                            max: 20
                        }
                    },
                    move: {
                        enable: true,
                        speed: 3,
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: {
                            default: "out"
                        }
                    }
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "bubble"
                        }
                    },
                    modes: {
                        bubble: {
                            distance: 150,
                            size: 6,
                            duration: 2,
                            opacity: 0.5,
                            speed: 3
                        }
                    }
                },
                detectRetina: true
            });
        });
    </script>

    @include('partials.vue.login')


</body>

</html>
