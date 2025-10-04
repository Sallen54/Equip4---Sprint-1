document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#usersTable tbody");

    // Mostrar usuarios en la tabla
    mostrarUsuarios();

    // Botón para crear usuarios
    document.querySelector("#btCreate").addEventListener("click", () => {
        window.location.href = "usuaris.html";
    });

    function getUsuarios() {
        return {
            nom: JSON.parse(localStorage.getItem("nom") || "[]"),
            nomUsuari: JSON.parse(localStorage.getItem("nomUsuari") || "[]"),
            email: JSON.parse(localStorage.getItem("email") || "[]"),
            contrasenya: JSON.parse(localStorage.getItem("contrasenya") || "[]")
        };
    }

    function mostrarUsuarios() {
        const users = getUsuarios();
        tbody.innerHTML = "";

        if (users.nomUsuari.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5">No hi ha usuaris</td></tr>`;
            return;
        }

        users.nomUsuari.forEach((nombre, i) => {
            tbody.innerHTML += `
                <tr>
                    <td>${users.nom[i]}</td>
                    <td>${nombre}</td>
                    <td>${users.email[i]}</td>
                    <td>${"*".repeat(users.contrasenya[i].length)}</td>
                    <td>
                        <button onclick="editarUsuario(${i})">Editar</button>
                        <button onclick="eliminarUsuario(${i})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }

    // Función global para editar
    window.editarUsuario = function(i) {
    const users = getUsuarios();

    const nuevoNom = prompt("Nou nom real:", users.nom[i]);
    if (nuevoNom === null || !validateNombreReal(nuevoNom.trim())) return;

    const nuevoNombre = prompt("Nou nom usuari:", users.nomUsuari[i]);
    if (nuevoNombre === null || !validateNickname(nuevoNombre.trim())) return;

    const nuevoEmail = prompt("Nou email:", users.email[i]);
    if (nuevoEmail === null || !validateEmail(nuevoEmail.trim())) return;

    const nuevaContrasenya = prompt("Nova contrasenya:", users.contrasenya[i]);
    if (nuevaContrasenya === null || !validatePassword(nuevaContrasenya)) return;

    // Si todas las validaciones pasan, se guardan los datos
    users.nom[i] = nuevoNom.trim();
    users.nomUsuari[i] = nuevoNombre.trim();
    users.email[i] = nuevoEmail.trim();
    users.contrasenya[i] = nuevaContrasenya.trim();

    localStorage.setItem("nom", JSON.stringify(users.nom));
    localStorage.setItem("nomUsuari", JSON.stringify(users.nomUsuari));
    localStorage.setItem("email", JSON.stringify(users.email));
    localStorage.setItem("contrasenya", JSON.stringify(users.contrasenya));

    alert("Usuari actualitzat correctament!");
    mostrarUsuarios();
};

    // Función global para eliminar
    window.eliminarUsuario = function(i) {
        const users = getUsuarios();

        if (confirm(`Segur que vols eliminar l'usuari "${users.nomUsuari[i]}"?`)) {
            users.nom.splice(i, 1);
            users.nomUsuari.splice(i, 1);
            users.email.splice(i, 1);
            users.contrasenya.splice(i, 1);

            localStorage.setItem("nom", JSON.stringify(users.nom));
            localStorage.setItem("nomUsuari", JSON.stringify(users.nomUsuari));
            localStorage.setItem("email", JSON.stringify(users.email));
            localStorage.setItem("contrasenya", JSON.stringify(users.contrasenya));

            alert("Usuari eliminat correctament!");
            mostrarUsuarios();
        }
    };
});


//Funcions per a la validacio dels camps
function validateNombreReal(name) {
    const pattern = /^[A-Z][a-zA-Z]{1,19}$/;
    if (!pattern.test(name.trim())) {
        alert("Nom real: 2-20 lletres, comença amb majúscula, sense números.");
        return false;
    }
    return true;
}

function validateNickname(name) {
    const pattern = /^[A-Z][a-zA-Z0-9]{1,19}$/;
    if (!pattern.test(name.trim())) {
        alert("Nom usuari: 2-20 caràcters, comença amb majúscula, números permesos.");
        return false;
    }
    return true;
}

function validatePassword(password) {
    const pattern = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
    if (!pattern.test(password)) {
        alert("Contrasenya: ha de contenir almenys una majúscula i un símbol.");
        return false;
    }
    return true;
}

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email.trim())) {
        alert("Email: format invàlid, ha de contenir '@' i domini.");
        return false;
    }
    return true;
}
