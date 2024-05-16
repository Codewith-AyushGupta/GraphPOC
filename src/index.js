import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Filters from "./Componends/Filters";
import reportWebVitals from "./reportWebVitals";
import GraphHandler from "./Componends/GraphHandler";
// import GraphHandlerD3 from "./Componends/GraphHandlerD3";
// import GetData from "./Componends/GetData";
// import GraphHandlerReCharts from "./Componends/GraphHandlerReCharts";
// import AppContext from "./Componends/AppContext";
// import IndexDb from "./localStorage/indexDb";
// import IndexedDBV2 from "./localStorage/IndexedDBV2";
import Store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    {/* <AppContext>
      <GetData />
      <GraphHandlerD3 />
      <GraphHandlerReCharts />
      <GraphHandler />
    </AppContext>
    <IndexDb />
    <IndexedDBV2 />
    <Filters />
    <FetchDataFromIndexDb /> */}
    <Provider store={Store}>
      <GraphHandler />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
