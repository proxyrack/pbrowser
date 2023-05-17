import { Info } from 'react-feather';
import { useState } from 'react';
import * as S from './styles';

type CollapsibleAlertProps = {
  collapsedText: string | JSX.Element;
  expandedText: string | JSX.Element;
  collapsedInitially?: boolean;
  className?: string;
};

const CollapsibleAlert = ({
  collapsedText,
  expandedText,
  collapsedInitially = true,
  className,
}: CollapsibleAlertProps) => {
  const [collapsed, setCollapsed] = useState(collapsedInitially);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <S.AlertContainer className={className}>
      <S.IconContainer>
        <Info size={20} />
      </S.IconContainer>
      {collapsed && (
        <S.ContentContainer>
          <p>
            {collapsedText}&nbsp;
            <S.ToggleButton type="button" onClick={handleToggle}>
              Expand &gt;&gt;
            </S.ToggleButton>
          </p>
        </S.ContentContainer>
      )}
      {!collapsed && (
        <S.ContentContainer>
          <p>{expandedText}</p>
          <S.CollapseButtonContainer>
            <S.ToggleButton type="button" onClick={handleToggle}>
              Hide details
            </S.ToggleButton>
          </S.CollapseButtonContainer>
        </S.ContentContainer>
      )}
    </S.AlertContainer>
  );
};

export default CollapsibleAlert;
