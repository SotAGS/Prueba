document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("subscription-form");
  const modal = document.getElementById("modal");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalMsg = document.getElementById("modal-mensaje");
  const cerrarBtn = document.getElementById("cerrar-modal");

  const campos = {
    nombre: {
      val: v => v.length > 6 && v.includes(" "),
      msg: "Debe tener más de 6 letras y un espacio."
    },
    email: {
      val: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      msg: "Debe tener un email válido."
    },
    password: {
      val: v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v),
      msg: "Al menos 8 caracteres con letras y números."
    },
    repassword: {
      val: v => v === document.getElementById("password").value,
      msg: "Las contraseñas no coinciden."
    },
    edad: {
      val: v => parseInt(v) >= 18,
      msg: "Debe ser mayor o igual a 18."
    },
    telefono: {
      val: v => /^\d{7,}$/.test(v),
      msg: "Debe tener al menos 7 dígitos sin símbolos."
    },
    direccion: {
      val: v => v.length >= 5 && /\d/.test(v) && /\s/.test(v),
      msg: "Debe tener al menos 5 caracteres, números y un espacio."
    },
    ciudad: {
      val: v => v.length >= 3,
      msg: "Debe tener al menos 3 caracteres."
    },
    cp: {
      val: v => v.length >= 3,
      msg: "Debe tener al menos 3 caracteres."
    },
    dni: {
      val: v => /^\d{7,8}$/.test(v),
      msg: "Debe ser un número de 7 u 8 dígitos."
    }
  };

  // Cargar desde LocalStorage
  window.onload = function () {
    const guardado = JSON.parse(localStorage.getItem("formulario"));
    if (guardado) {
      for (const id in guardado) {
        const input = document.getElementById(id);
        if (input) input.value = guardado[id];
      }
    }
  };

  // Validaciones blur/focus
  for (const id in campos) {
    const input = document.getElementById(id);
    const errorMsg = input.nextElementSibling;

    input.addEventListener("blur", () => {
      if (!campos[id].val(input.value)) {
        errorMsg.textContent = campos[id].msg;
      }
    });

    input.addEventListener("focus", () => {
      errorMsg.textContent = "";
    });
  }

  // Edición del título en vivo
  document.getElementById("titulo-formulario").addEventListener("input", function () {
    const nuevoTitulo = this.value.trim();
    const tituloDOM = document.getElementById("titulo-dinamico");
    tituloDOM.textContent = nuevoTitulo || "Formulario de Suscripción";
  });

  // Envío del formulario
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let errores = [];
    let datos = {};

    for (const id in campos) {
      const input = document.getElementById(id);
      const errorMsg = input.nextElementSibling;
      if (!campos[id].val(input.value)) {
        errorMsg.textContent = campos[id].msg;
        errores.push(`${id}: ${campos[id].msg}`);
      } else {
        datos[id] = input.value;
      }
    }

    if (errores.length > 0) {
      mostrarModal("Errores de validación", errores.join("\n"));
      return;
    }

    // Envío POST
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    })
    .then(res => {
      if (!res.ok) throw new Error("Error en la solicitud");
      return res.json();
    })
    .then(data => {
      localStorage.setItem("formulario", JSON.stringify(datos));
      mostrarModal("¡Suscripción exitosa!", JSON.stringify(data, null, 2));
      form.reset();
    })
    .catch(() => {
      mostrarModal("Error", "Hubo un error al enviar los datos.");
    });
  });

  // Modal
  cerrarBtn.addEventListener("click", () => {
    modal.classList.add("oculto");
  });

  function mostrarModal(titulo, mensaje) {
    modalTitulo.textContent = titulo;
    modalMsg.textContent = mensaje;
    modal.classList.remove("oculto");
  }
});
