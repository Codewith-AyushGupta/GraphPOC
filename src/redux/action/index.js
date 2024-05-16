export const loadJsonData = (jsonData) => ({
  type: 'LOAD_JSON_DATA',
  payload: jsonData,
});

export const filterData1 = (filterCriteria) => ({
  type: 'FILTER_DATA1',
  payload: filterCriteria,
});
