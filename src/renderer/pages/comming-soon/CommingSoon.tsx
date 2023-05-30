import styled from 'styled-components';

const Message = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  font-size: 1.25rem;
  line-height: 1.5rem;
  z-index: 100;
  margin-left: 150px;
  margin-right: -150px;
`;

const CommingSoon = () => {
  return (
    <Message>
      We are currently developing this feature and it will be released soon. Stay tuned
      for updates on this upcoming enhancement that aims to improve your overall
      experience with our application.
    </Message>
  );
};

export default CommingSoon;
