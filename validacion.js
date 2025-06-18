document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("subscription-form");

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

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let errores = [];
    let datos = [];

    for (const id in campos) {
      const input = document.getElementById(id);
      const errorMsg = input.nextElementSibling;
      if (!campos[id].val(input.value)) {
        errores.push(`${id}: ${campos[id].msg}`);
        errorMsg.textContent = campos[id].msg;
      } else {
        datos.push(`${id}: ${input.value}`);
      }
    }

    if (errores.length > 0) {
      alert("Errores:\n" + errores.join("\n"));
    } else {
      alert("Datos enviados:\n" + datos.join("\n"));
      form.reset();
    }
  });

  // Edición en tiempo real del título
  document.getElementById("titulo-formulario").addEventListener("input", function () {
    const nuevoTitulo = this.value.trim();
    const tituloDOM = document.getElementById("titulo-dinamico");
    if (nuevoTitulo.length > 0) {
      tituloDOM.textContent = nuevoTitulo;
    } else {
      tituloDOM.textContent = "Formulario de Suscripción";
    }
  });
});
