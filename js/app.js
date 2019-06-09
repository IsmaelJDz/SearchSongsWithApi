import { API } from "./api.js";
import * as UI from "./interfaz.js";

// console.log(UI);

UI.formularioBuscar.addEventListener("submit", e => {
  e.preventDefault();

  //obtener datos de form
  const artista = document.querySelector("#artista").value,
    cancion = document.querySelector("#cancion").value;

  if (artista == "" || cancion == "") {
    //el usuario deja los campos vacios
    UI.divMensaes.innerHTML = "Error... Todos los campos son obligatorios";
    UI.divMensaes.classList.add("error");
    setTimeout(() => {
      UI.divMensaes.innerHTML = "";
      UI.divMensaes.classList.remove("error");
    }, 3000);
  } else {
    //form completo
    const api = new API(artista, cancion);
    api
      .consultarAPI()
      .then(data => {
        //console.log(data);)
        if (data.respuesta.lyrics) {
          //console.log("Si existe");
          const letra = data.respuesta.lyrics;
          UI.divResultado.innerHTML = letra;
        } else {
          //console.log('No existe')
          UI.divMensaes.innerHTML =
            "Error... La cancion no existe prúeba con otra";
          UI.divMensaes.classList.add("error");
          setTimeout(() => {
            UI.divMensaes.innerHTML = "";
            UI.divMensaes.classList.remove("error");
            UI.formularioBuscar.reset();
          }, 3000);
        }
      })
      .catch(() => {
        console.log("error  catch");
      });
  }
});
