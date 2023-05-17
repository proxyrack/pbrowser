import {
  ReactConfirmProps,
  confirmable,
  createReactTreeMounter,
  createMountPoint,
  createConfirmationCreater,
} from 'react-confirm';

import { AlertTriangle, X } from 'react-feather';
import { useState } from 'react';
import Modal from 'styled-react-modal';
import * as S from './styles';
import Button, { ButtonColor } from '../button';

type DialogButtonOptions = {
  label: string;
  color: ButtonColor;
};

type DialogButtonsOptions = {
  cancel: DialogButtonOptions;
  ok: DialogButtonOptions;
};

type ConfirmDialogProps = {
  buttons: DialogButtonsOptions;
};

const ConfirmDialog = confirmable(
  ({ show, proceed, confirmation, buttons }: ReactConfirmProps & ConfirmDialogProps) => {
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

    return (
      <Modal
        isOpen={show}
        onEscapeKeydown={() => proceed(false)}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        backgroundProps={{ opacity }}
      >
        <S.ModalDialog opacity={opacity}>
          <S.Title>
            <S.Heading>Please Confirm</S.Heading>
            <S.CloseButton type="button" onClick={() => proceed(false)}>
              <X size={16} />
            </S.CloseButton>
          </S.Title>
          <S.Content>
            <S.Icon>
              <AlertTriangle />
            </S.Icon>
            <S.Message>{confirmation}</S.Message>
          </S.Content>
          <S.Actions>
            <Button
              type="button"
              color={buttons.ok.color}
              fullWidth
              onClick={() => proceed(true)}
            >
              {buttons.ok.label}
            </Button>
            <Button
              type="button"
              color={buttons.cancel.color}
              fullWidth
              onClick={() => proceed(false)}
            >
              {buttons.cancel.label}
            </Button>
          </S.Actions>
        </S.ModalDialog>
      </Modal>
    );
  }
);

const mounter = createReactTreeMounter();
export const MountPoint = createMountPoint(mounter);
const createConfirmation = createConfirmationCreater(mounter);
const confirmationCreator = createConfirmation(ConfirmDialog);

export const confirm = (
  confirmation: string,
  buttons: DialogButtonsOptions = {
    ok: { label: 'Ok', color: 'danger' },
    cancel: { label: 'Cancel', color: 'secondary' },
  }
) => {
  return confirmationCreator({ confirmation, buttons });
};
