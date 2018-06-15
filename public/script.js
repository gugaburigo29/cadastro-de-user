function iniciarVue() {
    var login = Vue.component('login', {
        template: "<h1>Login</h1>"
    });
    var cadastro = Vue.component('cadastro', {
        template: "<h1>Cadastro</h1>"
    });

    var router = new VueRouter({
        routes: [
            {path: '/', component: login},
            {path: '/c', component: cadastro}
        ]
    });


    var app = new Vue({
        router,
        data: {
            nome: undefined,
            pass: undefined,
            login: {
                res: undefined,
                msg: undefined
            },
            users: []
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

                this.Login(nome, pass);
            },
        }
    }).$mount('#app');
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