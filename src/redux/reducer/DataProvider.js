// reducer.js
import data from '..//..//SampData/data.json';

const initialState = {
  jsonData: data,
  filteredData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_JSON_DATA':
      return {
        ...state,
        jsonData: action.payload,
        filteredData: action.payload.slice(0, 5), // Initial chunk of 500 records
      };
    case 'FILTER_DATA1':
      const filterCriteria = action.payload;
      const filteredData = initialState.jsonData.slice(0, 50); 
      return {
        ...state,
        filteredData,
      };
    default:
      return state;
  }
};

export default reducer;
