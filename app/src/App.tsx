import { FC } from 'react';
import Layout from './components/layout/Layout';
import Prefectures from './components/prefecture/Prefectures';
import { useGetPrefectures, useGetPopulationValue } from './hooks/prefecutre';
import PopulationChart from './components/charts/PopulationChart';
import './App.scss';

const App: FC = () => {
  const { prefectures } = useGetPrefectures();
  const { populationValueList, checkedPrefList, handleChecked } = useGetPopulationValue();

  return (
    <Layout>
      <Prefectures prefectures={prefectures} handleChecked={handleChecked} />
      <PopulationChart populationValue={populationValueList} checkedPrefList={checkedPrefList} />
    </Layout>
  );
};

export default App;
