import React, { useState } from 'react';
import axios from 'axios';

const useGetPopulationValue = () => {
  const [populationValueList, setPolupationValueList] = useState<any[]>([]);
  const [checkedPrefList, setCheckedPrefList] = useState<any[][]>([]);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prefId = Number(e.target.value);
    const prefName = e.target.name;
    if (checkedPrefList.some((val) => val.includes(prefId))) {
      setCheckedPrefList(checkedPrefList.filter((val) => val[0] !== prefId));
      deleteTargetPopulationValue(prefName);
    } else {
      setCheckedPrefList([...checkedPrefList, [prefId, prefName]]);
      getPopulation(prefId, prefName);
    }
  };

  const getPopulation = async (id: number, prefName: string) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_RESAS_ENDPOINT + '/api/v1/population/composition/perYear',
        {
          params: { prefCode: id },
          headers: { 'X-API-KEY': `${process.env.REACT_APP_RESAS_API_KEY}` },
        }
      );

      const result = data.result.data[0].data;

      if (!result.length) {
        return;
      }

      let newPolulationValueList = [];
      if (populationValueList.length) {
        newPolulationValueList = mergePolupationValue(prefName, result, populationValueList);
      } else {
        newPolulationValueList = mergePolupationValue(prefName, result);
      }
      setPolupationValueList(newPolulationValueList);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response && e.response.status === 400) {
        throw new Error(e.message);
      }
    }
  };

  const mergePolupationValue = (name: string, newList: any, oldList: any = []) => {
    const mergeList = [];
    for (let i = 0; i < newList.length; i++) {
      let temp: any = {};
      if (oldList.length) {
        temp = { ...oldList[i] };
      } else {
        temp = { ...newList[i] };
      }
      temp[name] = newList[i].value;
      if (!oldList.length) {
        delete temp.value;
      }
      mergeList.push(temp);
    }
    return mergeList;
  };

  const deleteTargetPopulationValue = (prefName: string) => {
    for (let i = 0; i < populationValueList.length; i++) {
      delete populationValueList[i][prefName];
    }
  };

  return { populationValueList, checkedPrefList, handleChecked };
};

export default useGetPopulationValue;
