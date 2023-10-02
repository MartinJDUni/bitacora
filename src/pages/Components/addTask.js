import React, { useState } from 'react';
import AddTaskModal from '@/pages/Components/addTaskModal';

const AddTask = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Ventana para añadir tarea</h1>
      <button onClick={openModal}>Añadir tarea</button>
      <AddTaskModal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
};

export default AddTask;
