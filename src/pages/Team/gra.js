import React, { useEffect, useState } from 'react';
import Layout from '@/pages/Layout/layout';
import { PrismaClient } from '@prisma/client';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import style from '@/styles/Workers.module.css';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  try {
    // Realiza la consulta a la base de datos en getServerSideProps
    const asignadoData = await prisma.asignado.findMany();
    
    // Mapea los datos necesarios para el gráfico
    const dataForChart = asignadoData.map((item) => ({
      Id: item.Id,
      Meta: item.Meta,
    }));

    return {
      props: {
        dataForChart,
      },
    };
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    return {
      props: {
        dataForChart: [], // En caso de error, proporciona un array vacío
      },
    };
  }
}

export default function AsignadoChart({ dataForChart }) {
  return (
    <Layout>
      <div className={style.container}>
        <h1 className={style.title}>Gráfico de Asignado</h1>
        <div className={style.chartContainer}>
          <BarChart width={600} height={400} data={dataForChart}>
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
