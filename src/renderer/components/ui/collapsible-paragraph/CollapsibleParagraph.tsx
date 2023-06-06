import { createRef, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import * as S from './styles';

type CollapsibleParagraphProps = {
  text: string | undefined;
};

const CollapsibleParagraph = ({ text = '' }: CollapsibleParagraphProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [truncated, setTruncated] = useState(false);
  const paragraphRef = createRef<HTMLParagraphElement>();

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setTruncated(entry.target.scrollHeight > entry.contentRect.height);
      });
    });
    observer.observe(paragraphRef?.current as Element);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <S.Wrapper>
      <S.Paragraph ref={paragraphRef} collapsed={collapsed}>
        {text}
      </S.Paragraph>
      {(truncated || !collapsed) && (
        <S.Toggle onClick={handleToggle}>
          {collapsed && <ChevronDown />}
          {!collapsed && <ChevronUp />}
        </S.Toggle>
      )}
    </S.Wrapper>
  );
};

export default CollapsibleParagraph;
