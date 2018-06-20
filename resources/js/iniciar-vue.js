function iniciarVue() {
    var login = Vue.component('login', {
        template: `<div class="bloco center" id="bloco-principal"><form id="form-login" class="display-flex em-coluna"><input id="nome" :class="[{ 'error': login.res === false}, {'check':login.res === true}]" v-model="nome" placeholder="User. Ex.: user123" type="text"><input id="pass" v-model="pass" placeholder="Senha. Ex.: 12345abcd" type="password"><button id="send" v-on:click="enviarForm()" type="button">Login</button></form></div>`,
        data: function () {
            return {
                nome: undefined,
                pass: undefined,
                login: {
                    res: undefined,
                    msg: undefined
                },
                users: []
            };
        },
        beforeCreate() {
            barraLoader();
        },
        mounted: function () {
            this.getUsers();
        },
        methods: {
            getUsers: function () {
                this.$http.get("http://localhost:3000/users").then(function (response) {
                    this.users = response.data;
                }, function (error) {
                    console.log(error.statusText);
                });
            },
            Login: function (nome, pass) {
                var login = this.login;
                for (var user of this.users) {
                    if (nome === user.nome) {
                        if (pass === user.pass) {
                            login.res = true;
                            login.msg = "Logado!";
                            break;
                        } else {
                            login.res = false;
                            login.msg = "Senha incorreta";
                            break;
                        }
                    } else {
                        login.res = false;
                        login.msg = "Usuario nao cadastrado";
                    }
                }
                mostraMsg(login.msg, login.res)
            },
            enviarForm: function (e) {
                var nome = this.nome;
                var pass = this.pass;

                pass = CryptoJS.SHA256(pass);
                pass = pass.toString(CryptoJS.enc.Base64);
                console.log(pass)

                this.Login(nome, pass);
            },
        }
    });
    var cadastro = Vue.component('cadastro', {
        template: `
            <div class="bloco center" id="bloco-principal">
                <form id="form-login" class="display-flex em-coluna">
                    <input type="text" v-on:keyup="validarNome()" v-model="name" placeholder="Nome usuario">
                    <input type="password" v-model="pass" placeholder="Password">
                    <input type="password" v-model="confirmPass" placeholder="Confirme Password">
                    <button type="button" v-on:click="enviarForm">Enviar</button>
                </form>
            </div>
`,
        beforeCreate() {
            barraLoader();
        },
        data: function () {
            return {
                name: undefined,
                nameValid: undefined,
                pass: undefined,
                confirmPass: undefined,
                user: {
                    name: undefined,
                    pass: undefined
                },
                usersServer: []
            }
        },
        mounted: function () {
            this.getUsers()
        },
        methods: {
            getUsers: function () {
                this.$http.get(`http://localhost:3000/users/`).then(function (response) {
                    this.usersServer.push(response.data)
                    console.log(this.usersServer)
                }, function (error) {
                    console.log(error.statusText);
                });
            },
            validarNome: function () {
                for (var user of this.usersServer[0]) {
                    if (this.name === user.nome) {
                        this.nameValid = false
                        console.log(this.nameValid)
                        mostraMsg('Usuario já cadastrado', this.nameValid)
                        break
                    } else {
                        this.nameValid = true;
                        console.log(this.nameValid)
                    }
                }
            },
            enviarForm: function () {
                var payload = {
                    nome: this.name,
                    pass: this.pass
                };
                JSON.stringify(payload)
                console.log(payload)
                this.$http.post(`http://localhost:3000/users/`, payload, {emulateJSON: true}).then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.log(error.statusText);
                });
            },
        }
    });

    var router = new VueRouter({
        routes: [
            {path: '/', component: login},
            {path: '/cadastro', component: cadastro}
        ]
    });


    var app = new Vue({
        router,
    }).$mount('#app');
}