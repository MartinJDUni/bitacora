import React, { useState } from 'react';
import Layout from "@/pages/Layout/layout";
import { PrismaClient } from '@prisma/client';
import style from "@/styles/Task.module.css";
import AddTaskModal from '@/pages/Components/addTaskModal'; // Importa el componente de modal

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const tareas = await prisma.tarea.findMany();
  return {
    props: {
      tareas,
    },
  };
}

export default function TareasPage({ tareas }) {
  const [filterText, setFilterText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Cambia el nombre de la variable de estado

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <br></br>
      <div className={style.container}>
        <h1 className={style.title}>Tabla de Tareas</h1>
        <div className={style.filterContainer}>
          <input
            type="text"
            placeholder="Filtrar por nombre"
            value={filterText}
            onChange={handleFilterChange}
          />
          <button className={style.addButton} onClick={handleOpenModal}>
            Agregar Tarea
          </button>
        </div>
        <div className={style.tableContainer}>
          {/* ... Código de la tabla de tareas ... */}
        </div>
      </div>

      {/* Pasa las propiedades isOpen y onClose al componente AddTaskModal */}
      <AddTaskModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Layout>
  );
}
