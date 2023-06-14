import {
  ReactConfirmProps,
  confirmable,
  createReactTreeMounter,
  createMountPoint,
  createConfirmationCreater,
} from 'react-confirm';
import { AlertTriangle } from 'react-feather';
import * as S from './styles';
import Button, { ButtonColor } from '../button';
import Dialog from '../dialog';

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
    return (
      <Dialog
        show={show}
        size="sm"
        title="Please Confirm"
        onXClick={() => proceed(false)}
        onEscapeKeydown={() => proceed(false)}
        body={
          <S.ContentContainer>
            <S.Icon>
              <AlertTriangle />
            </S.Icon>
            <S.Message>{confirmation}</S.Message>
          </S.ContentContainer>
        }
        footer={
          <>
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
          </>
        }
      />
    );
  }
);

const mounter = createReactTreeMounter();
export const MountPoint = createMountPoint(mounter);
const createConfirmation = createConfirmationCreater(mounter);
const confirmationCreator = createConfirmation<any, boolean>(ConfirmDialog);

export const confirm = (
  confirmation: string | JSX.Element,
  buttons: DialogButtonsOptions = {
    ok: { label: 'Yes', color: 'danger' },
    cancel: { label: 'No', color: 'secondary' },
  }
) => {
  return confirmationCreator({ confirmation, buttons });
};
