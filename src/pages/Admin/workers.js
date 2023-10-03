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
          <table className={style.table}>
            <thead className={style.tableHeader}>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Contraseña</th>
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              {employees
                .filter((employee) =>
                  employee.Nombre.toLowerCase().includes(filterText.toLowerCase())
                )
                .map((employee) => (
                  <tr key={employee.Id} className={style.tableRow}>
                    <td>{employee.Id}</td>
                    <td>{employee.Nombre}</td>
                    <td>{employee.Apellido}</td>
                    <td>{employee.Email}</td>
                    <td>{employee.Password}</td>
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

      <AddWorkerModal isOpen={isModalVisible} onClose={hideModal} />
    </Layout>
  );
}
