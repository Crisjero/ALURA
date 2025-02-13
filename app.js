let amigos = [];

function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim(); 

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido ingresado.");
        return;
    }

    amigos.push(nombre);
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach(amigo => {
        let li = document.createElement("li");
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos dos participantes.");
        return;
    }

    let disponibles = [...amigos];
    let asignaciones = {};

    // Mezclar aleatoriamente usando Fisher-Yates
    for (let i = disponibles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [disponibles[i], disponibles[j]] = [disponibles[j], disponibles[i]];
    }

    // Asegurar que nadie se asigne a sí mismo
    for (let i = 0; i < amigos.length; i++) {
        if (amigos[i] === disponibles[i]) {
            sortearAmigo();
            return;
        }
    }

    // Asignar los nombres mezclados
    for (let i = 0; i < amigos.length; i++) {
        asignaciones[amigos[i]] = disponibles[i];
    }

    mostrarResultados(asignaciones);
}

function mostrarResultados(asignaciones) {
    let resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";

    for (let [amigo, asignado] of Object.entries(asignaciones)) {
        let li = document.createElement("li");
        li.textContent = `${amigo} → ${asignado}`;
        resultadoLista.appendChild(li);
    }
}
