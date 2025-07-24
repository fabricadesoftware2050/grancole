<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduGest Pro - Matrículas</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
    <!-- Toastify CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />
  </head>
  <body class="bg-gray-100 font-sans">
    <!-- Sidebar -->
    <div class="flex min-h-screen" id="app">
         @include('partials.loading')
      <aside class="w-64 bg-white shadow-lg">
        <div class="p-6 flex items-center space-x-2">
          <div class="bg-purple-600 text-white p-2 rounded-full">🎓</div>
          <h1 class="text-xl font-bold text-gray-800">EduGest Pro</h1>
        </div>
        <nav class="mt-6">
          <ul class="space-y-1 text-gray-700 text-sm">
            <li><a href="#" class="block px-6 py-2 hover:bg-purple-100">📊 Dashboard</a></li>
            <li><a href="#" class="block px-6 py-2 hover:bg-purple-100">🎓 Estudiantes</a></li>
            <li><a href="#" class="block px-6 py-2 hover:bg-purple-100">👨‍🏫 Profesores</a></li>
            <li><a href="#" class="block px-6 py-2 hover:bg-purple-100">📚 Desempeño</a></li>
            <li><a href="#" class="block px-6 py-2 hover:bg-purple-100">📄 Boletines</a></li>
            <li><a href="#" class="block px-6 py-2 hover:bg-purple-100">🕒 Asistencia</a></li>
            <li><a href="#" class="block px-6 py-2 bg-green-100 text-green-800 rounded-l-full font-semibold">📝 Matrículas</a></li>
            <li><a href="#" class="block px-6 py-2 hover:bg-purple-100">🎯 Actividades</a></li>
            <li><a href="#" class="block px-6 py-2 hover:bg-purple-100">📂 Materiales</a></li>
            <li><a href="#" class="block px-6 py-2 hover:bg-purple-100">💬 Foros</a></li>
            <li><a href="#" class="block px-6 py-2 hover:bg-purple-100">⚙️ Configuración</a></li>
          </ul>
        </nav>
        <div class="absolute bottom-0 left-0 w-full p-4 border-t text-center text-xs text-gray-500">
          <p>Administrador<br /><span class="text-gray-600">admin@colegio.edu</span></p>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-6 bg-gray-50">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Proceso de Matrículas</h2>
            <p class="text-sm text-gray-500">miércoles, 23 de julio de 2025</p>
          </div>
          <input type="text" placeholder="Buscar..." class="px-4 py-2 border rounded shadow-sm" />
        </div>

        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Gestiona las solicitudes de matrícula</h3>
          <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">+ Nueva Matrícula</button>
        </div>

        <!-- Lista de estudiantes -->
        <div class="space-y-4">
          <!-- Tarjeta 1 -->
          <div class="bg-white shadow p-4 rounded-lg flex items-start justify-between">
            <div class="flex space-x-4">
              <div class="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">SR</div>
              <div>
                <h4 class="text-md font-semibold text-gray-800">Sofía Ramírez</h4>
                <p class="text-sm text-gray-500">sofia.ramirez@estudiante.edu • 📞 +1 (555) 567-8901</p>
                <p class="text-sm text-gray-500">6°A • Solicitud: 2024-01-15 • Acudiente: <span class="font-medium">Carmen Ramírez</span></p>
              </div>
            </div>
            <div class="flex space-x-2 items-center">
              <span class="text-xs px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full">Pendiente</span>
              <button class="text-gray-500 hover:text-gray-700">✏️</button>
              <button class="text-gray-500 hover:text-gray-700">👁️</button>
              <button class="text-gray-500 hover:text-gray-700">↻</button>
            </div>
          </div>

          <!-- Tarjeta 2 -->
          <div class="bg-white shadow p-4 rounded-lg flex items-start justify-between">
            <div class="flex space-x-4">
              <div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">AM</div>
              <div>
                <h4 class="text-md font-semibold text-gray-800">Andrés Morales</h4>
                <p class="text-sm text-gray-500">andres.morales@estudiante.edu • 📞 +1 (555) 678-9012</p>
                <p class="text-sm text-gray-500">7°B • Solicitud: 2024-01-18 • Acudiente: <span class="font-medium">Luis Morales</span></p>
              </div>
            </div>
            <div class="flex space-x-2 items-center">
              <span class="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full">Aprobada</span>
              <button class="text-gray-500 hover:text-gray-700">✏️</button>
              <button class="text-gray-500 hover:text-gray-700">👁️</button>
              <button class="text-gray-500 hover:text-gray-700">↻</button>
            </div>
          </div>

          <!-- Tarjeta 3 -->
          <div class="bg-white shadow p-4 rounded-lg flex items-start justify-between">
            <div class="flex space-x-4">
              <div class="w-12 h-12 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold">IC</div>
              <div>
                <h4 class="text-md font-semibold text-gray-800">Isabella Cruz</h4>
                <p class="text-sm text-gray-500">isabella.cruz@estudiante.edu • 📞 +1 (555) 789-0123</p>
                <p class="text-sm text-gray-500">8°A • Solicitud: 2024-01-20 • Acudiente: <span class="font-medium">María Cruz</span></p>
              </div>
            </div>
            <div class="flex space-x-2 items-center">
              <span class="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">En Revisión</span>
              <button class="text-gray-500 hover:text-gray-700">✏️</button>
              <button class="text-gray-500 hover:text-gray-700">👁️</button>
              <button class="text-gray-500 hover:text-gray-700">↻</button>
            </div>
          </div>
        </div>
      </main>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <!-- Toastify JS -->
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    @include('partials.vue.home')
  </body>
</html>
