import React, { useEffect } from "react";
import dummyData from "../SampData/data.json";
import CryptoJS from 'crypto-js';
 
export default function IndexDb() {
  useEffect(() => {
    const idb = window.indexedDB;
    let db;

    const createCollectionInIndexDB = () => {
      if (!idb) {
        console.error("IndexedDB is not supported in this browser");
        return;
      }

      const request = idb.open("graphData", 1);
      request.onerror = (event) => {
        console.error("Error while opening the database:", event.target.error);
      };
      request.onupgradeneeded = (event) => {
        db = event.target.result;
        if (!db.objectStoreNames.contains("GraphPointsTable")) {
          db.createObjectStore("GraphPointsTable", {
            keyPath: "_id"
          });
        }
      };
      request.onsuccess = (event) => {
        console.log("Database opened successfully");
        db = event.target.result;
        const tx = db.transaction("GraphPointsTable", "readwrite");
        const store = tx.objectStore("GraphPointsTable");

        if (dummyData) {
          dummyData.forEach((item) => {
            if (item.sales_description) {
              item.sales_description.forEach((salesdesc) => {
                const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(salesdesc), '0OOx4,,./12#421').toString();
                const key = salesdesc['_id'];
                store.add({ data: encryptedData, _id: key });
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
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);
  const handleTabClose = () => {
    const idb = window.indexedDB;
    if (!idb) {
      console.error("IndexedDB is not supported in this browser");
      return;
    }
    const request = idb.deleteDatabase("graphData");
    request.onerror = (event) => {
      console.error("Error deleting database", event.target.error);
    };
    request.onsuccess = (event) => {
      console.log("Database deleted successfully");
    };
  };

  return <div></div>;
}
