import React from 'react';
import {Composition} from 'remotion';
import {FlatShop} from './FlatShop';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="FlatShop"
      component={FlatShop}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
