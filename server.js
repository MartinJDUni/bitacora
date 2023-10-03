// server.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors'); // Importa el middleware CORS

const app = express();
const prisma = new PrismaClient();
// Configurar CORS

app.use(express.json());
app.use(cors());
// Ruta para obtener todos los empleados
app.get('/api/empleados', async (req, res) => {
  try {
    const empleados = await prisma.empleado.findMany();
    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener un empleado por ID
app.get('/api/empleados/:id', async (req, res) => {
  try {
    const empleadoId = parseInt(req.params.id);
    const empleado = await prisma.empleado.findUnique({
      where: { Id: empleadoId },
    });
    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el empleado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear un nuevo empleado
app.post('/api/empleados', async (req, res) => {
  try {
    const { Nombre, Apellido, Email, Contraseña } = req.body;
    const nuevoEmpleado = await prisma.empleado.create({
      data: {
        Nombre,
        Apellido,
        Email,
        Contraseña,
      },
    });
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    console.log('Error al crear un nuevo empleado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para actualizar un empleado por ID
app.put('/api/empleados/:id', async (req, res) => {
  try {
    const empleadoId = parseInt(req.params.id);
    const { Nombre, Apellido, Email, Contrasena } = req.body;
    const empleadoActualizado = await prisma.empleado.update({
      where: { Id: empleadoId },
      data: {
        Nombre,
        Apellido,
        Email,
        Contraseña,
      },
    });
    res.json(empleadoActualizado);
  } catch (error) {
    console.error('Error al actualizar el empleado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar un empleado por ID
app.delete('/api/empleados/:id', async (req, res) => {
  try {
    const empleadoId = parseInt(req.params.id);
    await prisma.empleado.delete({
      where: { Id: empleadoId },
    });
    res.json({ message: 'Empleado eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear una nueva tarea relacionada con un empleado
app.post('/api/tareas', async (req, res) => {
  try {
    const { nombreTarea, descripcion, idAsignado } = req.body;

    // Realiza la lógica para insertar la tarea en la base de datos
    const nuevaTarea = await prisma.tarea.create({
      data: {
        Nombre: nombreTarea,
        Descripcion: descripcion,
        IdAsignado: idAsignado, // Asigna la tarea al empleado con el ID proporcionado
      },
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error('Error al crear una nueva tarea relacionada con un empleado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
