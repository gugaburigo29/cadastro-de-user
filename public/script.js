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
        template: ' <div class="bloco center" id="bloco-principal"><form id="form-login" class="display-flex em-coluna"><input type="text" placeholder="Nome usuario"><input type="password" placeholder="Password"><button type="button">Enviar</button></form></div>',
        beforeCreate() {
            barraLoader();
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
function barraLoader() {
    var barra = document.getElementById("loader-top");
        barra.style.display = 'block';

        setTimeout(function () {
            barra.style.display = 'none';
        }, 1000)
}
function mostraMsg(msg, classe) {
    var div = $('<div class="res"></div>');
    var icon = $('<span class="icon"></span>')
    var css = classe.toString();
    div.addClass(css)
    if (css === 'true') {
        div.text(`Logado`)
        icon.html('<i class="fas fa-check-circle"></i>')
        icon.appendTo(div)
    }

    if (css === 'false') {
        div.text(msg)
        icon.html('<i class="fas fa-exclamation-triangle"></i>')
        icon.appendTo(div)
    }

    div.prependTo('#notify')
    div.animate({
        'margin-top': '200px'
    }, 3000, function () {
        $(this).remove()
    })
}
function verificaLogin(nome, pass) {
    var check;
    for (const user of users) {
        if (nome === user.name) {
            if (pass !== user.pass) {
                check = {
                    res: false,
                    msg: 'Senha incorreta'
                };
                break;
            } else {
                check = {
                    res: true,
                    msg: 'Logado com sucesso.',
                    nome: user.name
                };
                break;
            }
        }
        else {
            check = {
                res: false,
                msg: 'User nao encontrado'
            }
        }
    }

    return check;
}