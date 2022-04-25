import { FC, ChangeEvent } from 'react';
import { Prefecture } from '../../types/prefecture';

interface PrefectureCheckBoxProps {
  prefecture: Prefecture;
  isChecked: boolean;
  handleChecked: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PrefectureCheckBox: FC<PrefectureCheckBoxProps> = ({
  prefecture,
  isChecked,
  handleChecked,
}) => {
  return (
    <>
      <input
        id={`prefecture-${prefecture.prefCode.toLocaleString()}`}
        className="check-box"
        type="checkbox"
        name={prefecture.prefName}
        value={prefecture.prefCode}
        checked={isChecked}
        onChange={handleChecked}
      />
      <label className="button" htmlFor={`prefecture-${prefecture.prefCode.toLocaleString()}`}>
        {prefecture.prefName}
      </label>
    </>
  );
};

export default PrefectureCheckBox;
