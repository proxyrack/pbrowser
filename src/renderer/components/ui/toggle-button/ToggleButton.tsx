/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as S from './styles';

type ToggleButtonProps = {
  id: string;
  name: string;
  children: string;
  onClick?: (isToggled: boolean) => void;
};

const ToggleButton = ({ id, name, children, onClick = () => {} }: ToggleButtonProps) => {
  const [isToggled, toggle] = useState(false);
  const { register } = useFormContext();

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <S.ButtonBox>
      <S.Checkbox
        id={id}
        type="checkbox"
        defaultChecked={isToggled}
        onClick={callback}
        {...register(name)}
      />
      <S.Button isToggled={isToggled}>{children}</S.Button>
    </S.ButtonBox>
  );
};

export default ToggleButton;
