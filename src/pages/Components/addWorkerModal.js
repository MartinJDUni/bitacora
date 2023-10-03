import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

Modal.setAppElement('#__next');

const AddWorkerModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envía los datos del nuevo empleado al servidor Express
      const response = await axios.post('http://localhost:3001/api/empleados', {
        Nombre: name,
        Apellido: apellido,
        Email: email,
        Contrasena: contrasena,
      });

      if (response.status === 201) {
        // Cierra el modal después de agregar el empleado exitosamente
        onClose();
      } else {
        // Maneja el error, muestra un mensaje al usuario u otras acciones
        console.error('Error al agregar el empleado:', response.data.error);
      }
    } catch (error) {
      console.error('Error al agregar el empleado:', error);
      // Maneja el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Añadir Empleado">
      <h2>Añadir empleado</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" value={apellido} onChange={handleApellidoChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={contrasena} onChange={handleContrasenaChange} />
        </div>
        <br />
        <button className="btnAdd">Agregar</button>
        <button className="btnCancel" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </Modal>
  );
};

export default AddWorkerModal;
