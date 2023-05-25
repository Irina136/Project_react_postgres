import React, {useState, useEffect} from 'react';

function App() {
  const [merchants, setMerchants] = useState(false);
  useEffect(() => {
    getMerchant();
  }, []);

  // отобразить
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setMerchants(data);
      });
  }

  // создать запись
  function createMerchant() {
    let name1 = prompt('Ввод merchant name1');
    let name2 = prompt('Ввод merchant name2');
    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name1, name2}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }


  // удалить запись
  function deleteMerchant() {
    let id = prompt('Ввод merchant id');

    // fetch(`http://localhost:3001/merchants/${id}`, {
      fetch('http://localhost:3001/merchants/'+ id, {
    method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  
  // изменить запись
  function editMerchant() {
     let id = prompt('Ввод Edit id');
     let name1 = prompt('Ввод merchant name1');
      fetch('http://localhost:3001/merchants/' + id, {
      // fetch('http://localhost:3001/merchants/'+ id, {
    method: 'PUT',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  

  return (
    <div>
      {merchants ? merchants : 'There is no merchant data available'}
      <br/>
      <button onClick={createMerchant}>Добавить merchant</button>
      <br/>
      <button onClick={deleteMerchant}>Удалить merchant</button>
      <br/>
      <button onClick={editMerchant}>Изменить merchant</button>
    </div>
  );
}

export default App;