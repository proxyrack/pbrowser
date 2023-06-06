import * as S from './styles';

type LabelProps = {
  htmlFor?: string;
  children: string;
};

const Label = ({ htmlFor = undefined, children }: LabelProps): JSX.Element => {
  return (
    <S.LabelBox>
      <S.Label htmlFor={htmlFor}>{children}</S.Label>
    </S.LabelBox>
  );
};

export default Label;
