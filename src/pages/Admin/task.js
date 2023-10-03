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
          <table className={style.table}>
            <thead className={style.tableHeader}>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>IDAsignado</th>
                <th></th>
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              {tareas
                .filter((tarea) =>
                  tarea.Nombre.toLowerCase().includes(filterText.toLowerCase())
                )
                .map((tarea) => (
                  <tr key={tarea.Id} className={style.tableRow}>
                    <td>{tarea.Id}</td>
                    <td>{tarea.Nombre}</td>
                    <td>{tarea.Descripcion}</td>
                    <td>{tarea.IdAsignado}</td>
                    <td>
                      <button className={style.editButton}>Editar</button>
                      <button className={style.deleteButton}>Eliminar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pasa las propiedades isOpen y onClose al componente AddTaskModal */}
      <AddTaskModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Layout>
  );
}
