import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import Layout from "@/pages/Layout/layout";
import { PrismaClient } from '@prisma/client';
import style from "@/styles/Workers.module.css";

const prisma = new PrismaClient();

async function obtenerDatosDesdeBD() {
  try {
    const datos = await prisma.asignado.findMany(); // Reemplaza 'tuTabla' con el nombre de tu tabla
    return datos;
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    return [];
  }
}

export default function GraficoPage() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function obtenerDatos() {
      const datosDesdeBD = await obtenerDatosDesdeBD();
      setDatos(datosDesdeBD);
    }

    obtenerDatos();
  }, []);

  return (
    <Layout>
      <div className={style.container}>
        <h1 className={style.title}>Gráfico de Barras</h1>
        <div className={style.chartContainer}>
          <BarChart width={600} height={400} data={datos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Meta" fill="#0070f3" />
          </BarChart>
        </div>
      </div>
    </Layout>
  );
}
