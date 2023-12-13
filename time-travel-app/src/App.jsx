import { useEffect, useState, useCallback } from 'react';
import './App.css'
import { Table } from './table';
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const ledger = import.meta.env.VITE_LEDGER;

function generateQueryBody(ledger) {
  return {
    from: ledger,
    where: {
      '@id': '?subject',
      country: '?country',
      score: '?score',
      year: '?year'
    },
    select: {
      '?subject': ['country', 'score'] 
    },
    'opts': {
      orderBy: ['ASC', '?score']
    }
    
  };
}




function issueQuery(queryBody, apiKey) {
  return axios.post('http://localhost:58090/fluree/query', queryBody, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
      'Accept': 'text/plain'
    },
  });
}

function App() {
  const [entities, setEntities] = useState([]);
  const [setSelected] = useState(null);
  const [ setIsEdit] = useState(false);
  const [setNewEntityOpen] = useState(false);
  const [ setFormState] = useState({
    country: '',
    score: '',
  });
  const refreshData = useCallback(
    () =>
      issueQuery(generateQueryBody(ledger), apiKey)
        .then((response) => {
          setEntities(response.data);
          setSelected(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        }),
    [setEntities, setSelected]
  );

  useEffect(() => {
    if (entities.length > 0) return;
    refreshData();
  }, [entities, refreshData]);

  const handleEdit = (entity) => {
    setIsEdit(true);
    setFormState(entity);
    setNewEntityOpen(true);
  };
  return (
    <>
      <div className='min-h-full'>
        <div className='py-10'>
          <main>
            <Table
               {...{
                entities,
                handleEdit,
              }}
            />
          </main>
        </div>
      </div>
      </>
  )
}

export default App
