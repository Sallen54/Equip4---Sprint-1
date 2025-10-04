// Generar un session_id únic si encara no existeix
if (!sessionStorage.getItem("session_id")) {
  sessionStorage.setItem("session_id", crypto.randomUUID());
}

// Variable per saber si estem editant un registre concret
let indexEdicio = null;

// Funció per mostrar els registres a la taula
function mostrarTaula() {
  const tbody = document.querySelector("#taulaResultat tbody");
  tbody.innerHTML = "";

  const registres = JSON.parse(localStorage.getItem("registres")) || [];

  registres.forEach((registre, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${registre.session_id}</td>
      <td>${registre.user_agent}</td>
      <td>${registre.client_id}</td>
      <td>${registre.comparator_id}</td>
      <td>${registre.favorite_id}</td>
      <td>${registre.date_start}</td>
      <td>${registre.date_end}</td>
      <td>
        <button onclick="editarRegistre(${index})">Editar</button>
        <button onclick="esborrarRegistre(${index})">Esborrar</button>
      </td>
    `;

    tbody.appendChild(fila);
  });
}

// Quan s’envia el formulari
document
  .getElementById("formulariRegistre")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const dadesRegistre = {
      session_id: sessionStorage.getItem("session_id"),
      user_agent:
        document.getElementById("user_agent").value || navigator.userAgent,
      client_id: document.getElementById("client_id").value,
      comparator_id: document.getElementById("comparator_id").value,
      favorite_id: document.getElementById("favorite_id").value,
      date_start: document.getElementById("date_start").value,
      date_end: document.getElementById("date_end").value,
    };

    let registres = JSON.parse(localStorage.getItem("registres")) || [];

    if (indexEdicio !== null) {
      // Si estem editant, substituir el registre existent
      registres[indexEdicio] = dadesRegistre;
      indexEdicio = null;
    } else {
      // Si no, afegim un de nou
      registres.push(dadesRegistre);
    }

    localStorage.setItem("registres", JSON.stringify(registres));

    mostrarTaula();
    document.getElementById("formulariRegistre").reset();
  });

// Netejar només el formulari
document
  .getElementById("netejarFormulari")
  .addEventListener("click", function () {
    document.getElementById("formulariRegistre").reset();
    indexEdicio = null; // Cancel·lar edició si estava activa
  });

// Funció per esborrar un registre
function esborrarRegistre(index) {
  let registres = JSON.parse(localStorage.getItem("registres")) || [];
  registres.splice(index, 1); // eliminar l'element
  localStorage.setItem("registres", JSON.stringify(registres));
  mostrarTaula();
}

// Funció per editar un registre
function editarRegistre(index) {
  let registres = JSON.parse(localStorage.getItem("registres")) || [];
  const registre = registres[index];

  // Omplim el formulari amb les dades seleccionades
  document.getElementById("user_agent").value = registre.user_agent;
  document.getElementById("client_id").value = registre.client_id;
  document.getElementById("comparator_id").value = registre.comparator_id;
  document.getElementById("favorite_id").value = registre.favorite_id;
  document.getElementById("date_start").value = registre.date_start;
  document.getElementById("date_end").value = registre.date_end;

  indexEdicio = index; // Guardem quin registre s'està editant
}

// Mostrar la taula quan carreguem la pàgina
mostrarTaula();
