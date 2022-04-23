import React, { FC } from 'react';
import { Prefecture } from '../../types/prefecture';

interface PrefectureCheckBoxProps {
  prefecture: Prefecture;
  checkedPrefList: any[];
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PrefectureCheckBox: FC<PrefectureCheckBoxProps> = ({
  prefecture,
  checkedPrefList,
  handleChecked,
}) => {
  return (
    <div className="prefecture-checkbox">
      <input
        id={`prefecture-${prefecture.prefCode.toLocaleString()}`}
        className="check-box"
        type="checkbox"
        name={prefecture.prefName}
        value={prefecture.prefCode}
        checked={checkedPrefList.some((val) => val[0] === prefecture.prefCode)}
        onChange={handleChecked}
      />
      <label htmlFor={`prefecture-${prefecture.prefCode.toLocaleString()}`}>
        {prefecture.prefName}
      </label>
    </div>
  );
};

export default PrefectureCheckBox;
