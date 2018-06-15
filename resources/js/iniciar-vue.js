function iniciarVue() {
    var login =  Vue.component('login', {
        template: "<h1>asd</h1>"
    });

    var router = new VueRouter({
        routes: [
            {path: '/', component: login}
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
            users: [

            ]
        },
        mounted: function() {
            this.getUsers();
        },
        methods: {
            getUsers: function(){
                this.$http.get("http://localhost:3000/users").then(function(response){
                    this.users = response.data;
                }, function(error){
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