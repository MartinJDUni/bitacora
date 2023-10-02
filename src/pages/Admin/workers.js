import React, { useEffect, useState } from 'react';
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
  const [newEmployee, setNewEmployee] = useState({
    Nombre: '',
    Apellido: '',
    Email: '',
  });

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleAddEmployee = async () => {
    // Aquí puedes agregar lógica para enviar el nuevo empleado a la base de datos
    console.log('Nuevo empleado:', newEmployee);
  };

  return (
    <Layout>
      <div className={style.conteiner}>
        <h1 className={style.tit}>Tabla de Empleados</h1>
        <div className={style.filterContainer}>
          <input
            type="text"
            placeholder="Filtrar por nombre"
            value={filterText}
            onChange={handleFilterChange}
          />
          <button onClick={handleAddEmployee}>Agregar Empleado</button>
        </div>
        <table className={style.tab}>
          <thead className={style.tabHeade}>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className={style.tabBody}>
            {employees
              .filter((employee) =>
                employee.Nombre.toLowerCase().includes(filterText.toLowerCase())
              )
              .map((employee) => (
                <tr key={employee.Id} className={style.tabPart}>
                  <td>{employee.Id}</td>
                  <td>{employee.Nombre}</td>
                  <td>{employee.Apellido}</td>
                  <td>{employee.Email}</td>
                  <td>
                    <button className={style.edit}>Editar</button>
                    <button className={style.delete}>Eliminar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className={style.addEmployeeContainer}>
          <h2>Agregar Empleado</h2>
          <form>
            <input
              type="text"
              placeholder="Nombre"
              value={newEmployee.Nombre}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, Nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Apellido"
              value={newEmployee.Apellido}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, Apellido: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmployee.Email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, Email: e.target.value })
              }
            />
            <button type="button" onClick={handleAddEmployee}>
              Agregar
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
