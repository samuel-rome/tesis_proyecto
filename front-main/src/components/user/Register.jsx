import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";


export const Register = () => {

  const {form, changed} = useForm({});
  const [ saved, setSaved ] = useState(" ");

  const saveUser = async(e) => {
    // Prevenir actualizacion de pantalla
    e.preventDefault();

    // Recoger datos del formulario
    let newUser = form;

    // Guardar usuario en el backend
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await request.json();

    if(data.status == "success"){
      setSaved("saved");
    }else{
      setSaved("error");
    }

  }// Fin del metodo Guardar
  

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>

      <div className="content__posts">

        {saved == "saved" ?
        <strong className="alert alert-success"> Usuario registrado Correctamente !! </strong>
        : ''}

        {saved == "error" ?
        <strong className="alert alert-danger"> Usuario no se ha registrado !!</strong>
        : ''}
        
        <form className="register-form" onSubmit={saveUser}>

          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" name="surname" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="profession">Carrera</label>
            <select className="select_form_profession" required name="profession" onChange={changed}>
              <option > Seleccionar...</option>
              <option value="Diseño y Desarrollo de Software">Diseño y Desarrollo de Software</option>
              <option value="Big Data y Ciencia de Datos">Big Data y Ciencia de Datos</option>
              <option value="Diseño y Desarrollo de Simuladores y Videojugos">Diseño y Desarrollo de Simuladores y Videojugos</option>
              <option value="Administración de Redes y Comunicaciones">Administración de Redes y Comunicaciones</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electronico</label>
            <input type="email" name="email" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <input type="submit" value="Registrate" className="btn btn-success" />
        </form>

      </div>
    </>
  );
};