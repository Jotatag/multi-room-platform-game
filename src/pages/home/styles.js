import styled from 'styled-components';

import Texture from '../../assets/texture.png';

export const Container = styled.div`
  background: url(${Texture});
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  &.mobile {
    background: white;
    font-size: 24px;
    font-weight: 700;
  }
`
