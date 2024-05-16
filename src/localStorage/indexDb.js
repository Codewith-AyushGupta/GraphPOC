import React, { useEffect } from "react";
import dummyData from "../SampData/data.json";

export default function IndexDb() {
  useEffect(() => {
    const idb = window.indexedDB ;
    const createCollectionInIndexDB = () => {
      if (!idb) {
        alert("IndexedDB is not initialized");
        return;
      }
      const request = idb.open("graphData", 1);
      request.onerror = (event) => {
        console.log("error while opening the data base mostlikely yout enterd a wrong version ", event);
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("GraphPointsTable")) {
          db.createObjectStore("GraphPointsTable", {
            keyPath: "_id",
          });
        }
      };
      request.onsuccess = (event) => {
        console.log("Database opened successfully");
        const db = event.target.result;
        const tx = db.transaction("GraphPointsTable", "readwrite");
        const store = tx.objectStore("GraphPointsTable");
        
        if (dummyData) {
          dummyData.forEach((item) => {
            if (item.sales_description) {
              item.sales_description.forEach((salesdesc) => {
                // Here, we directly add the salesdesc object to the store
                store.add(salesdesc);
              });
            }
          });
          console.log("Data added to IndexedDB");
        } else {
          console.error("Failed to fetch JSON data.");
        }
      };
    };
    createCollectionInIndexDB();
  }, []);

  return <div></div>;
}
