import React, { useState } from 'react';
import Layout from "@/pages/Layout/layout";
import { PrismaClient } from '@prisma/client';
import style from "@/styles/Workers.module.css";
import AddWorkerModal from '@/pages/Components/addWorkerModal'; 
import Modal from 'react-modal';

const prisma = new PrismaClient();

Modal.setAppElement('#__next');

export async function getServerSideProps() {
  const employees = await prisma.empleado.findMany();
  return {
    props: {
      employees,
    },
  };
}

export default function EmployeesPage({ employees }) {
  const [filterText, setFilterText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <br></br>
      <div className={style.container}>
        <h1 className={style.title}>Tabla de Empleados</h1>
        <div className={style.filterContainer}>
          <input
            type="text"
            placeholder="Filtrar por nombre"
            value={filterText}
            onChange={handleFilterChange}
          />
          <button className={style.addButton} onClick={showModal}>
            Agregar Empleado
          </button>
        </div>
        <div className={style.tableContainer}>
          {/* ... Código de la tabla de empleados ... */}
        </div>
      </div>

      <AddWorkerModal isOpen={isModalVisible} onClose={hideModal} />
    </Layout>
  );
} 