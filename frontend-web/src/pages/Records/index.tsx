import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';

import Pagination from './Pagination';

import './styles.css';

type Record = {
  id: number;
  moment: string;
  name: string;
  age: number;
  gamePlatform: 'PC' | 'XBOX' | 'PLAYSTATION';
  gameTitle: string;
  genreName: string;
}

type RecordsResponse = {
  content: Record[];
  totalPages: number;
}

const Records = () => {

  const [records, setRecords] = useState<RecordsResponse>();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    function loadRecords() {
      api.get(`/records?linesPerPage=12&page=${activePage}`).then((response) => {
        setRecords(response.data);
      });
    };

    loadRecords();
    
  }, [activePage]);

  const handlePageChange = useCallback((item: number) => {
    setActivePage(item);
  }, [])

  return (
    <div className='page-container'>
      <div className='filters-container records-actions'>
        <Link to='/charts'>
          <button className='action-filters'>
            VER GRÁFICOS
          </button>
        </Link>
      </div>
      <table className='records-table' cellPadding='0' cellSpacing='0'>
        <thead>
          <tr>
            <th>INSTANTE</th>
            <th>NOME</th>
            <th>IDADE</th>
            <th>PLATAFORMA</th>
            <th>GÊNERO</th>
            <th>TÍTULO DO GAME</th>
          </tr>
        </thead>
        <tbody>
          {records && records.content.map((record) => (
            <tr key={record.id}>
              <td>{formatDate(record.moment)}</td>
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td className='text-secondary'>{record.gamePlatform}</td>
              <td>{record.genreName}</td>
              <td className='text-primary'>{record.gameTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination 
        totalPages={records?.totalPages} 
        activePage={activePage}
        goToPage={handlePageChange}
      />
      
    </div>
  );
}

export default Records;