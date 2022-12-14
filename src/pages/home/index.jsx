import React from 'react';
import * as Style from './styles';
import Canvas from '../../components/canvas';
import useCheckMobileScreen from '../../hooks/isMobile';

const Home = () => {
    return (
        useCheckMobileScreen() 
        ? (
            <Style.Container className='mobile'>
                Resolution not supported!
            </Style.Container>
          )
        : (
            <Style.Container>
                <Canvas />
            </Style.Container>
          )
    );
}

export default Home;
