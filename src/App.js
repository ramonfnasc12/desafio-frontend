import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [rep, setRep] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response =>
      setRep(response.data)
    );
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title:`${Date.now()} Novo Ítem`,
      techs:["React, ReactJS, NodeJS"],
      url: 'http://api.com'
    });
      setRep([...rep,response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRep(rep.filter(repo => repo.id!==id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {rep.map(repo => {
          return (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
