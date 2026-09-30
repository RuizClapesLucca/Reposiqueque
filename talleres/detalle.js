// ==========================================
// DEV 2 - LÓGICA DE MÓDULOS DE DETALLE
// Archivo: detalle.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Identificar en qué taller estamos según la página abierta
  const rutaActual = window.location.pathname;
  let tallerClave = "python"; // Por defecto (taller1.html)

  if (rutaActual.includes("taller2")) {
    tallerClave = "redes";
  } else if (rutaActual.includes("taller3")) {
    tallerClave = "bd";
  }

  // 2. Ubicar la sección donde van los alumnos registrados
  const contenedorRegistros = document.querySelector(".attendance-log-section") || 
                              document.querySelector("section:last-of-type");

  if (!contenedorRegistros) return;

  // 3. Consultar la "base de datos" guardada en localStorage
  const registrosGuardados = localStorage.getItem(`asistentes_${tallerClave}`);

  if (registrosGuardados) {
    const listaAlumnos = JSON.parse(registrosGuardados);

    // Si hay alumnos registrados por el formulario del Líder, mostrarlos
    if (Array.isArray(listaAlumnos) && listaAlumnos.length > 0) {
      
      let htmlContent = `
        <h2 class="section-title">Alumnos registrados</h2>
        <div class="alumnos-list-container">
          <ul class="alumnos-list">
      `;

      listaAlumnos.forEach((alumno) => {
        htmlContent += `
          <li class="alumno-item">
            <strong>${alumno.nombre}</strong> — Boleta: ${alumno.boleta}
          </li>
        `;
      });

      htmlContent += `
          </ul>
        </div>
      `;

      // Reemplaza el texto "No autorizado" por la lista de los alumnos registrados
      contenedorRegistros.innerHTML = htmlContent;
    }
  }
});