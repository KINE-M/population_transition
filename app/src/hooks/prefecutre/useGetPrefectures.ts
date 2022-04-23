import axios from 'axios';
import { useEffect, useState } from 'react';
import { Prefecture } from '../../types/prefecture';

const useGetPrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    getPrefectures();
  }, []);

  const getPrefectures = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_RESAS_ENDPOINT + '/api/v1/prefectures',
        {
          headers: {
            'X-API-KEY': `${process.env.REACT_APP_RESAS_API_KEY}`,
          },
        }
      );
      setPrefectures(data.result);
      // Todo エラー処理
    } catch (e) {}
  };

  return { prefectures };
};

export default useGetPrefectures;
