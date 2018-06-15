<template>
    <login>
        <div class="bloco center" id="bloco-principal">
            <form id="form-login" class="display-flex em-coluna">
                <input id="nome" :class="[{ 'error': login.res === false}, {'check':login.res === true}]" v-model="nome" placeholder="User. Ex.: user123" type="text">
                <input id="pass" v-model="pass" placeholder="Senha. Ex.: 12345abcd" type="password">
                <button id="send" v-on:click="enviarForm()" type="button">Login</button>
            </form>
        </div>
    </login>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped>

</style>