import Modal from 'styled-react-modal';
import { MouseEvent, MouseEventHandler, useState } from 'react';
import { X } from 'react-feather';
import * as S from './styles';
import { ModalSize } from './modal-size';

type DialogProps = {
  show: boolean;
  title: string;
  body: JSX.Element;
  footer: JSX.Element;
  size?: ModalSize;
  contentScrollbar?: boolean;
  onEscapeKeydown?: (event: Event) => void;
  onXClick?: MouseEventHandler;
  afterClose?: () => void;
};

const Dialog = ({
  show,
  size = 'md',
  title,
  body,
  footer,
  contentScrollbar = false,
  onEscapeKeydown,
  onXClick,
  afterClose,
}: DialogProps) => {
  const [opacity, setOpacity] = useState(0);

  const afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  };

  const beforeClose = () => {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  };

  const handleXClick = (event: MouseEvent<HTMLButtonElement>) => {
    onXClick?.(event);
  };

  return (
    <Modal
      isOpen={show}
      onEscapeKeydown={onEscapeKeydown}
      afterOpen={afterOpen}
      beforeClose={beforeClose}
      afterClose={afterClose}
      backgroundProps={{ opacity }}
    >
      <S.ModalDialog opacity={opacity} size={size}>
        <S.Title>
          <S.Heading>{title}</S.Heading>
          <S.CloseButton type="button" onClick={handleXClick}>
            <X size={16} />
          </S.CloseButton>
        </S.Title>
        <S.Content contentScrollbar={contentScrollbar}>{body}</S.Content>
        <S.Actions>{footer}</S.Actions>
      </S.ModalDialog>
    </Modal>
  );
};

export default Dialog;
