// Importa las bibliotecas necesarias
import React, { useState } from 'react';
import Layout from "@/pages/Layout/layout";
import { PrismaClient } from '@prisma/client';
import style from "@/styles/Workers.module.css";

const prisma = new PrismaClient();

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

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
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
          <button className={style.addButton}>Agregar Empleado</button>
        </div>
        <div className={style.tableContainer}>
          <table className={style.table}>
            <thead className={style.tableHeader}>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Acciones</th>
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
    </Layout>
  );
}
