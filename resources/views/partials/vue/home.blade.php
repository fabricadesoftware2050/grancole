<script>
        // Axios config para CSRF
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        //axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
       // axios.defaults.withCredentials = true;

        const {
            createApp
        } = Vue;

        const app = createApp({
            delimiters: ['[[', ']]'], // 👈 importante
            data() {
                return {
                    API_URL_BASE: 'http://localhost/grancolemono/public',
                    usuarios: [],
                    clave: '',
                    loading: false,
                    error: '',
                    esperando: false,
                    tiempoRestante: 0,
                    exito: false,
                    mostrarClave: false,
                    token: `${localStorage.getItem('token')}`,
                    token_type: `${localStorage.getItem('token_type')}`
                };
            },
                mounted() {
                    this.getUsuarios();
                },
            methods: {
                getUsuarios() {
                    axios.get(`${this.API_URL_BASE}/api/v1/users`, {
                            headers: {
                                'Authorization': `${this.token_type} ${this.token}`
                            }
                        })
                        .then(res => {

                            this.usuarios = res.data.data;
                            this.loading = false;
                            const token = res.data.access_token;

                        })
                        .catch(err => {
                            this.loading = false;
                            if(err.status===401){
                                this.error = 'No autorizado. Por favor, inicia sesión nuevamente.';
                                localStorage.clear();
                                window.location.href = "{{ route('login') }}"; // Redirige al login
                            } else {
                                this.error = 'Error al obtener los usuarios.';

                            };
                            Toastify({
                                text: `<i class="fas fa-exclamation-circle mr-2"></i> ${this.error || "Error al realizar la acción"}`,
                                duration: 3000,
                                close: true,
                                gravity: "top",
                                position: "right",
                                backgroundColor: "#ef4444",
                                stopOnFocus: true,
                                escapeMarkup: false
                            }).showToast();
                        });
                }
            }
        }).mount('#app');
    </script>
