import { FC, ChangeEvent } from 'react';
import PrefectureCheckBox from '../prefecture/PrefectureCheckBox';
import type { Prefecture } from '../../types/prefecture';

interface PrefecturesProps {
  prefectures: Prefecture[];
  checkedPrefList: Prefecture[];
  handleChecked: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAllClear: () => void;
}

const Prefectures: FC<PrefecturesProps> = ({
  prefectures,
  checkedPrefList,
  handleChecked,
  handleAllClear,
}) => {
  return (
    <div className="prefectures-box">
      <h1 className="title">都道府県別 総人口推移グラフ</h1>
      <p className="text">選択した都道府県の人口推移のグラフが表示されます。</p>
      <div className="prefectures-list">
        {prefectures &&
          prefectures.map((pref) => (
            <PrefectureCheckBox
              prefecture={pref}
              isChecked={checkedPrefList.some((val) => val.prefCode === pref.prefCode)}
              key={pref.prefCode.toLocaleString()}
              handleChecked={handleChecked}
            />
          ))}
        <span className="button clear-button" onClick={handleAllClear}>
          クリア
        </span>
      </div>
    </div>
  );
};

export default Prefectures;
