import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  const addHours = function(time, h){
    let timeCopy = new Date(time);
    timeCopy.setHours(time.getHours() + h);
    return timeCopy;
  }

  const strToDatetime = timeStr => {
    const hora = timeStr.split(':')[0];
    const min = timeStr.split(':')[1];
    let datetime = new Date();
    datetime.setHours(hora,min,0);
    return datetime;
  }

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Areglo de cita
  const [citas, guardarCitas] = useState(citasIniciales);

  //Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    }
    else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]); //array de dependencias - se ejecuta cuando cambie citas

  //función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  const validarFechaHoraCita = cita => {
    const citasMismaFecha = citas.filter(c => c.fecha === cita.fecha && 
      (strToDatetime(c.hora) < addHours(strToDatetime(cita.hora), 1) && addHours(strToDatetime(c.hora), 1) > strToDatetime(cita.hora)));
    return citasMismaFecha.length === 0;
  }

  //funcion que elimina cita por id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas': 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className='container'>
        <div className='row'>
            <div className='one-half column'>
              <Formulario
                crearCita = {crearCita}
                validarFechaHoraCita= {validarFechaHoraCita}
              />
            </div>
            <div className='one-half column'>
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  key = {cita.id}
                  cita = {cita}
                  eliminarCita = {eliminarCita}
                />
              ))}
            </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
