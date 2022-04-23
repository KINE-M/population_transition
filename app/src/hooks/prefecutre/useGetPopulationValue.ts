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
        setPolupationValueList([]);
        return;
      }

      // Todo リファクタリング
      // 人口構成情報を初めて取得するとき(populationValueが空の場合)
      const newPolulationValueList = [];
      if (!populationValueList.length) {
        for (let i = 0; i < result.length; i++) {
          let temp: any = {};
          temp = { ...result[i] };
          temp[prefName] = result[i].value;
          delete temp.value;
          newPolulationValueList.push(temp);
        }
      } else {
        for (let i = 0; i < result.length; i++) {
          let temp: any = {};
          temp = { ...populationValueList[i] };
          temp[prefName] = result[i].value;
          newPolulationValueList.push(temp);
        }
      }
      setPolupationValueList(newPolulationValueList);

      // Todo エラー処理
    } catch (e) {}
  };

  const deleteTargetPopulationValue = (prefName: string) => {
    for (let i = 0; i < populationValueList.length; i++) {
      delete populationValueList[i][prefName];
    }
  };

  return { populationValueList, checkedPrefList, handleChecked };
};

export default useGetPopulationValue;
