import React, { useState } from 'react';
import axios from 'axios';
import type { Prefecture } from '../../types/prefecture';

const useGetPopulationValue = () => {
  const [populationValueList, setPolupationValueList] = useState<any[]>([]);
  const [checkedPrefList, setCheckedPrefList] = useState<Prefecture[]>([]);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prefCode = Number(e.target.value);
    const prefName = e.target.name;
    if (checkedPrefList.some((val) => val.prefCode === prefCode)) {
      setCheckedPrefList(checkedPrefList.filter((val) => val.prefCode !== prefCode));
      deleteTargetPopulationValue(prefName);
    } else {
      setCheckedPrefList([...checkedPrefList, { prefCode, prefName }]);
      getPopulationValue(prefCode, prefName);
    }
  };

  const getPopulationValue = async (prefCode: number, prefName: string) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_RESAS_ENDPOINT + '/api/v1/population/composition/perYear',
        {
          params: { prefCode },
          headers: { 'X-API-KEY': `${process.env.REACT_APP_RESAS_API_KEY}` },
        }
      );

      const resPopulationValue = data.result.data[0].data;

      if (!resPopulationValue.length) {
        setCheckedPrefList(checkedPrefList.filter((val) => val.prefCode !== prefCode));
        return;
      }

      let newPolulationValueList = [];
      if (populationValueList.length) {
        newPolulationValueList = mergePolupationValue(
          prefName,
          resPopulationValue,
          populationValueList
        );
      } else {
        newPolulationValueList = mergePolupationValue(prefName, resPopulationValue);
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

  const handleAllClear = () => {
    setCheckedPrefList([]);
    setPolupationValueList([]);
  };

  return { populationValueList, checkedPrefList, handleChecked, handleAllClear };
};

export default useGetPopulationValue;
