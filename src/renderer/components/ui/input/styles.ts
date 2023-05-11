import { formControlBaseCss, inputBaseCss } from 'renderer/styles/sharedStyles';
import styled from 'styled-components';

export const Input = styled.input<{ fullWidth: boolean }>`
  ${inputBaseCss};
  ${formControlBaseCss};
  ${(props) => props.fullWidth && `width: 100%`};
`;
