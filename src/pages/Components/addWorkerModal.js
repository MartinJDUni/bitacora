import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const AddWorkerModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [comments, setComments] = useState(''); // Nuevo estado para los comentarios

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

  const handleSubmit = () => {
    // Realiza la lógica para agregar el trabajador con los comentarios
    onClose();
  };

  return ( 
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Añadir Trabajador"
    >
      <h2>Añadir trabajador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="text"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label>Rol:</label>
          <select
            value={role}
            onChange={handleRoleChange}
          >
            <option value="admin">Admin</option>
            <option value="colaborador">Colaborador</option>
          </select>
        </div>
        <br></br>
        <div>
          <textarea
          className='textarea'
            value={comments}
            onChange={handleCommentsChange}
          />
        </div>
        <br></br>
        <button className='btnAdd'>Agregar</button>
        <button className='btnCancel'>Cancelar</button>
      </form>
    </Modal>
  );
};

export default AddWorkerModal;
