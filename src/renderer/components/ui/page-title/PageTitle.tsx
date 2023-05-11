import * as S from './styles';

type PageTitleProps = {
  children: string;
};

const PageTitle = ({ children }: PageTitleProps) => {
  return <S.Heading>{children}</S.Heading>;
};

export default PageTitle;
