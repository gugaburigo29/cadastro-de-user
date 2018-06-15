function barraLoader() {
    var barra = document.getElementById("loader-top");
        barra.style.display = 'block';

        setTimeout(function () {
            barra.style.display = 'none';
        }, 1000)
}