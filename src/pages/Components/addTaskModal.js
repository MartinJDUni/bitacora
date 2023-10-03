import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

Modal.setAppElement('#__next');

const AddTaskModal = ({ isOpen, onClose }) => {
  const [nameTask, setNameTask] = useState('');
  const [comments, setComments] = useState('Descripcion de la tarea');
  const [idAsignado, setIdAsignado] = useState(1);

  const handleNameTaskChange = (e) => {
    setNameTask(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza una solicitud HTTP POST al servidor para crear una nueva tarea
      const response = await axios.post('http://localhost:3001/api/tareas', {
        nombreTarea: nameTask,
        descripcion: comments,
        idAsignado: idAsignado,
      });
      if (response.status === 201) {
        // Cierra el modal después de agregar el empleado exitosamente
        onClose();
      } else {
        // Maneja el error, muestra un mensaje al usuario u otras acciones
        console.error('Error al agregar el tarea:', response.data.error);
      }
    } catch (error) {
      console.error('Error al agregar el tarea:', error);
      // Maneja el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Añadir tarea"
    >
      <h2>Añadir tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='titleTask'>Nombre de la tarea:</label>
          <input
            type="text"
            value={nameTask}
            onChange={handleNameTaskChange}
          />
        </div>
        <br></br>
        <div>
          <textarea
            className='textarea'
            value={comments}
            onChange={handleCommentsChange}
          />
        </div>
        <br></br>
        <button className='btnAdd'>Aceptar</button>
        <button className='btnCancel'>Cancelar</button>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
