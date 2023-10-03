import React, { useState } from 'react';
import Modal from 'react-modal';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

Modal.setAppElement('#__next');

const AddWorkerModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [comments, setComments] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crea un nuevo trabajador en la base de datos utilizando Prisma
      const newWorker = await prisma.empleado.create({
        data: {
          Nombre: name,
          Username: username,
          Password: password,
          Email: email,
          Rol: role,
          Comentarios: comments,
        },
      });

      // Cierra el modal después de agregar el trabajador
      onClose();
    } catch (error) {
      console.error('Error al agregar el trabajador:', error);
      // Maneja el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Añadir Trabajador">
      <h2>Añadir trabajador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Usuario:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="text" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Rol:</label>
          <select value={role} onChange={handleRoleChange}>
            <option value="admin">Admin</option>
            <option value="colaborador">Colaborador</option>
          </select>
        </div>
        <br />
        <div>
          <textarea className="textarea" value={comments} onChange={handleCommentsChange} />
        </div>
        <br />
        <button className="btnAdd">Agregar</button>
        <button className="btnCancel" onClick={onClose}>Cancelar</button>
      </form>
    </Modal>
  );
};

export default AddWorkerModal;
