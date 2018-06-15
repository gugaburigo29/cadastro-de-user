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