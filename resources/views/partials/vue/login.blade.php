<script>
        // Axios config para CSRF
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute(
            'content');
       // axios.defaults.withCredentials = true;

        const {
            createApp
        } = Vue;

        const app = createApp({
            delimiters: ['[[', ']]'], // 👈 importante
            data() {
                return {
                    API_URL_BASE: 'http://localhost/grancolemono/public',
                    usuario: '',
                    clave: '',
                    loading: false,
                    error: '',
                    esperando: false,
                    tiempoRestante: 0,
                    exito: false,
                    mostrarClave: false
                };
            },
                mounted() {
                    this.verificarBloqueo();
                },
            methods: {
                login() {
                    if (this.estaBloqueado()) return;
                    this.loading = true;
                    this.error = '';
                    this.exito = false;

                    axios.post(`${this.API_URL_BASE}/api/v1/login`, {
                            email: this.usuario,
                            password: this.clave
                        })
                        .then(res => {
                             this.resetearIntentos();
                            this.exito = true;
                            this.loading = false;
                            const token = res.data.access_token;
                            localStorage.setItem('token', token);
                            localStorage.setItem('token_type', res.data.token_type);
                            Toastify({
                                text: `<i class="fas fa-check-circle mr-2"></i> Hola, ${res.data.data.name}`,
                                duration: 3000,
                                close: true,
                                gravity: "top",
                                position: "right",
                                backgroundColor: "#22c55e",
                                stopOnFocus: true,
                                escapeMarkup: false // Permite HTML en el texto
                            }).showToast();
                            // Redirige si quieres
                           window.location.href = "{{ route('home') }}"; // Cambia a la ruta que necesites
                        })
                        .catch(err => {
                            this.loading = false;
                             this.registrarIntentoFallido();
                            Toastify({
                                text: `<i class="fas fa-exclamation-circle mr-2"></i> ${err.response?.data?.message || "Error al iniciar sesión"}`,
                                duration: 3000,
                                close: true,
                                gravity: "top",
                                position: "right",
                                backgroundColor: "#ef4444",
                                stopOnFocus: true,
                                escapeMarkup: false
                            }).showToast();
                        });
                },registrarIntentoFallido() {
                    const intentos = parseInt(localStorage.getItem('failsAttemps')) || 0;
                    const nuevoTotal = intentos + 1;

                    localStorage.setItem('failsAttemps', nuevoTotal);

                    if (nuevoTotal >= 3) {
                        const desbloqueo = Date.now() + 5 * 60 * 1000; // 5 minutos
                        localStorage.setItem('blockUntil', desbloqueo);
                        this.verificarBloqueo();
                    }
                },
                resetearIntentos() {
                            localStorage.removeItem('failsAttemps');
                            localStorage.removeItem('blockUntil');
                        },
                        verificarBloqueo() {
            const desbloqueo = parseInt(localStorage.getItem('blockUntil'));
            const ahora = Date.now();

            if (desbloqueo && ahora < desbloqueo) {
                this.esperando = true;
                this.tiempoRestante = Math.floor((desbloqueo - ahora) / 1000);
                const intervalo = setInterval(() => {
                    this.tiempoRestante--;
                    if (this.tiempoRestante <= 0) {
                        clearInterval(intervalo);
                        this.esperando = false;
                        this.resetearIntentos();
                    }
                }, 1000);
            } else {
                this.resetearIntentos();
            }
        },
         estaBloqueado() {
            if (this.esperando) {
                Toastify({
                    text: `<i class="fas fa-clock mr-2"></i> Espere ${Math.floor(this.tiempoRestante / 60)} minutos y ${this.tiempoRestante % 60} segundos para volver a intentar`,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#f97316",
                    stopOnFocus: true,
                    escapeMarkup: false
                }).showToast();
                return true;
            }
            return false;
        }
            }
        }).mount('#app');
    </script>
