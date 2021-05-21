import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';


const Formulario = ({crearCita, validarFechaHoraCita}) => {

    const [mensajeError, actualizarErrorMsj] = useState('');

    //Crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    //funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //extraer valores
    const {mascota, propietario, fecha, hora, sintomas} = cita

    //Cuando el usuario envia el form
    const submitCita = e => {
        e.preventDefault();
        
        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
            hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            actualizarErrorMsj("Todos los campos son obligatorios");
            return;
        }
        else if(!validarFechaHoraCita(cita)){
            actualizarError(true);
            actualizarErrorMsj("Ya existe una cita en ese horario");
            return;
        }

        //Eliminar mensaje previo
        actualizarError(false);

        //Asignar un id
        cita.id = uuid();

        //Crear la cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }

    return (
        <Fragment>
            <h2>Crear cita</h2>
            { error ? 
                <p className= "alerta-error">{mensajeError}</p> 
                : null }
            <form
                onSubmit = {submitCita}
            >
                <label>Nombre mascota</label>
                <input 
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre mascota'
                    onChange = {actualizarState}
                    value = {mascota}
                />
                
                <label>Nombre dueño</label>
                <input 
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre dueño de la mascota'
                    onChange = {actualizarState}
                    value = {propietario}
                />
 
                <label>Fecha</label>
                <input 
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange = {actualizarState}
                    value = {fecha}
                />
                
                <label>Hora</label>
                <input 
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange = {actualizarState}
                    value = {hora}
                />

                <label>Síntomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange = {actualizarState}
                    value = {sintomas}
                ></textarea>

                <button
                    type = 'submit'
                    className='u-full-width button-primary'
                >Agregar cita</button>
            </form>
        </Fragment>
      );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired,
    validarFechaHoraCita: PropTypes.func.isRequired
}

export default Formulario;