import styled from '@emotion/styled';
import { IMaskMixin } from 'react-imask';

// extend style component
const StyledInput: any = styled.input`
  color: green;
`;

export const MaskedStyledInput = IMaskMixin(({ inputRef, ...props }) => (
  <StyledInput {...props} />
));
