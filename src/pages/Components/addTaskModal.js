import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const AddTaskModal = ({ isOpen, onClose }) => {
  const [nameTask, setNameTask] = useState('');
  const [comments, setComments] = useState('Descripcion de la tarea');

  const handleNameTaskChange = (e) => {
    setNameTask(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = () => {
    onClose();
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
