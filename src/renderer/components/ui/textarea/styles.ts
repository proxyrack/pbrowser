import { formControlBaseCss, inputBaseCss } from 'renderer/styles/sharedStyles';
import styled from 'styled-components';

export const Textarea = styled.textarea`
  ${inputBaseCss};
  ${formControlBaseCss};
  width: 100%;
  max-height: 6rem;
  resize: vertical;
`;
