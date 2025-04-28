let listaDeTareas = [
  { id: 101, descripcion: "Comprar comida", realizada: true },
  { id: 202, descripcion: "Estudiar JavaScript", realizada: false },
  { id: 303, descripcion: "Pasear a la mascota", realizada: false }
];

// Elementos del DOM
const tareaInput = document.getElementById("tareaInput");
const agregarBtn = document.getElementById("agregarBtn");
const tareasLista = document.getElementById("tareasLista");
const contadorTotal = document.getElementById("contadorTotal");
const contadorRealizadas = document.getElementById("contadorRealizadas");

// Mostrar tareas en pantalla
function mostrarTareas() {
  tareasLista.innerHTML = "";
  listaDeTareas.forEach(tarea => {
    const fila = document.createElement("tr");
    fila.className = tarea.realizada ? "tarea-completada" : "";
    fila.innerHTML = `
      <td>${tarea.id}</td>
      <td>${tarea.descripcion}</td>
      <td>
        <input type="checkbox" ${tarea.realizada ? "checked" : ""} 
          onclick="toggleEstado(${tarea.id})">
      </td>
      <td>
        <span class="delete-icon" onclick="borrarTarea(${tarea.id})">&times;</span>
      </td>
    `;
    tareasLista.appendChild(fila);
  });
  actualizarContadores();
}

// Actualizar resumen de tareas
function actualizarContadores() {
  contadorTotal.textContent = listaDeTareas.length;
  contadorRealizadas.textContent = listaDeTareas.filter(t => t.realizada).length;
}

// Agregar una nueva tarea
agregarBtn.addEventListener("click", () => {
  const texto = tareaInput.value.trim();
  if (texto === "") return;

  const nuevaTarea = {
    id: Date.now(),
    descripcion: texto,
    realizada: false
  };

  listaDeTareas.push(nuevaTarea);
  tareaInput.value = "";
  mostrarTareas();
});

// Cambiar estado de realizada
function toggleEstado(id) {
  const tarea = listaDeTareas.find(t => t.id === id);
  if (tarea) {
    tarea.realizada = !tarea.realizada;
    mostrarTareas();
  }
}

// Eliminar una tarea
function borrarTarea(id) {
  listaDeTareas = listaDeTareas.filter(t => t.id !== id);
  mostrarTareas();
}

// Inicializar
mostrarTareas();
