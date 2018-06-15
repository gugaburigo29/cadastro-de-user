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