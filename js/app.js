"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeButton = document.getElementById("theme_toggle_btn");
  const themeIcon = document.getElementById("theme_icon");
  const themeText = document.getElementById("theme_text");
  const contactForm = document.getElementById("contact_form");
  const formStatus = document.getElementById("form_status");

  function aplicarTema(tema) {
    root.dataset.theme = tema;
    const modoClaro = tema === "light";

    themeIcon.textContent = modoClaro ? "☾" : "☼";
    themeText.textContent = modoClaro ? "Modo oscuro" : "Modo claro";
    themeButton.setAttribute("aria-label", modoClaro ? "Activar modo oscuro" : "Activar modo claro");

    localStorage.setItem("cv_tema", tema);
  }

  function cargarTema() {
    const temaGuardado = localStorage.getItem("cv_tema");

    if (temaGuardado === "light" || temaGuardado === "dark") {
      aplicarTema(temaGuardado);
      return;
    }

    const prefiereClaro = window.matchMedia("(prefers-color-scheme: light)").matches;
    aplicarTema(prefiereClaro ? "light" : "dark");
  }

  function mostrarError(idCampo, mensaje) {
    const campo = document.getElementById(idCampo);
    const error = document.getElementById(`error_${idCampo.replace("_contacto", "")}`);

    if (mensaje) {
      campo.classList.add("invalid");
      campo.setAttribute("aria-invalid", "true");
      error.textContent = mensaje;
      return false;
    }

    campo.classList.remove("invalid");
    campo.removeAttribute("aria-invalid");
    error.textContent = "";
    return true;
  }

  function validarFormulario() {
    let formularioValido = true;

    const nombre = document.getElementById("nombre_contacto");
    const correo = document.getElementById("correo_contacto");
    const asunto = document.getElementById("asunto_contacto");
    const mensaje = document.getElementById("mensaje_contacto");

    if (nombre.value.trim().length < 3) {
      mostrarError("nombre_contacto", "Escribe un nombre de al menos 3 caracteres.");
      formularioValido = false;
    } else {
      mostrarError("nombre_contacto", "");
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim());
    if (!correoValido) {
      mostrarError("correo_contacto", "Ingresa un correo válido.");
      formularioValido = false;
    } else {
      mostrarError("correo_contacto", "");
    }

    if (asunto.value.trim().length < 4) {
      mostrarError("asunto_contacto", "El asunto debe tener al menos 4 caracteres.");
      formularioValido = false;
    } else {
      mostrarError("asunto_contacto", "");
    }

    if (mensaje.value.trim().length < 10) {
      mostrarError("mensaje_contacto", "El mensaje debe tener al menos 10 caracteres.");
      formularioValido = false;
    } else {
      mostrarError("mensaje_contacto", "");
    }

    return formularioValido;
  }

  themeButton.addEventListener("click", () => {
    const nuevoTema = root.dataset.theme === "dark" ? "light" : "dark";
    aplicarTema(nuevoTema);
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.className = "form_status";

    if (!validarFormulario()) {
      formStatus.textContent = "Revisa los campos marcados antes de enviar.";
      formStatus.classList.add("error");
      return;
    }

    formStatus.textContent = "Formulario válido. El mensaje está listo para enviarse.";
    formStatus.classList.add("success");
    contactForm.reset();
  });

  cargarTema();
});
