import { BrowserStatus } from 'shared/models';
import { useTheme } from 'styled-components';
import * as S from './styles';

type StatusLabelProps = {
  status: BrowserStatus;
};

const StatusLabel = ({ status }: StatusLabelProps): JSX.Element => {
  const theme = useTheme();
  const statusMapping = {
    [BrowserStatus.Active]: { text: 'Active', color: theme.colors.success },
    [BrowserStatus.Inactive]: null,
    [BrowserStatus.PendingActive]: { text: 'Pending', color: 'inherit' },
    [BrowserStatus.PendingInactive]: { text: 'Pending', color: 'inherit' },
    [BrowserStatus.StartError]: { text: 'Error', color: theme.colors.danger },
    [BrowserStatus.StopError]: { text: 'Error', color: theme.colors.danger },
  };

  return (
    <S.Label color={statusMapping[status]?.color}>{statusMapping[status]?.text}</S.Label>
  );
};

export default StatusLabel;
