import React, { useState } from 'react';

const FetchDataFromIndexDb = () => {
  const [startRange, setStartRange] = useState('');
  const [endRange, setEndRange] = useState('');

  const handleStartRange = (event) => {
    setStartRange(event.target.value);
  };

  const handleEndRange = (event) => {
    setEndRange(event.target.value);
  };

  const fetchDataFromIndexDb = async () => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction('graphData', 'readonly');
      const objectStore = transaction.objectStore('graphData');

      const lowerBound = parseInt(startRange, 10);
      const upperBound = parseInt(endRange, 10);

      const filteredData = [];
      const request = objectStore.openCursor();

      request.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          const value = cursor.value;
          if (value.amount >= lowerBound && value.amount <= upperBound) {
            filteredData.push(value);
          }
          cursor.continue();
        } else {
          return filteredData;
        }
      };

      return new Promise((resolve) => {
        request.onsuccess = (event) => {
          resolve(fetchDataFromIndexDb()); 
        };
      });
    } catch (error) {
      console.error('Error fetching data from IndexDB:', error);
      throw error; 
    }
  };

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('GraphPointsTable', 1);

      request.onerror = function (event) {
        reject('Error opening database');
      };

      request.onsuccess = function (event) {
        resolve(event.target.result);
      };

      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore('graphData', { keyPath: '_id' });
        objectStore.createIndex('amount', 'amount'); 
      };
    });
  };

  return (
    <div className="container">
      <input type="text" className="form-control" value={startRange} onChange={handleStartRange} placeholder="Start Range" aria-label="Start Range" aria-describedby="basic-addon1" />
      <input type="text" className="form-control" value={endRange} onChange={handleEndRange} placeholder="End Range" aria-label="End Range" aria-describedby="basic-addon1" />
      <button className="btn btn-primary">Get Record</button>
    </div>
  );
};

export default FetchDataFromIndexDb;
