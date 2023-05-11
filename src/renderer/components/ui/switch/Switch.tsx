/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as S from './styles';

type SwitchProps = {
  id: string;
  name: string;
  children: string;
  onClick?: (isToggled: boolean) => void;
};

const Switch = ({ id, name, children, onClick = () => {} }: SwitchProps) => {
  const [isToggled, toggle] = useState(false);
  const { register } = useFormContext();

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <S.SwitchBox>
      <S.Checkbox
        id={id}
        type="checkbox"
        defaultChecked={isToggled}
        onClick={callback}
        {...register(name)}
      />
      <S.Switch />
      <S.Label>{children}</S.Label>
    </S.SwitchBox>
  );
};

export default Switch;
