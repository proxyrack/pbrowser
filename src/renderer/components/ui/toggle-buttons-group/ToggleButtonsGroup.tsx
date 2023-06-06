/* eslint-disable react/jsx-props-no-spreading */
import { useFormContext } from 'react-hook-form';
import * as S from './styles';

type ToggleButtonsGroupProps = {
  name: string;
  options: any[];
};

const ToggleButtonsGroup = ({ name, options }: ToggleButtonsGroupProps) => {
  const { register } = useFormContext();

  return (
    <S.ButtonGroupBox>
      {options.map((option) => (
        <S.ButtonBox key={option.id}>
          <S.Radio id={option.id} type="radio" value={option.value} {...register(name)} />
          <S.Button>{option.text}</S.Button>
        </S.ButtonBox>
      ))}
    </S.ButtonGroupBox>
  );
};

export default ToggleButtonsGroup;
