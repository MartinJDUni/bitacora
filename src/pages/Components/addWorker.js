import React, { useState } from 'react';
import AddWorkerModal from '@/pages/Components/addWorkerModal';

const TuPagina = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Tu Aplicación</h1>
      <button onClick={openModal}>Añadir Trabajador</button>
      <AddWorkerModal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
};

export default TuPagina;
