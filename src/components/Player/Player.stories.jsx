import React, { useState } from 'react';
import { Player } from './Player';

export default {
  title: 'Components/Player',
  component: Player,
  argTypes: {
    sprite: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => {
  const [playerInfo, setPlayerInfo] = useState({
    position: { x: 0, y: 0 },
    sprite: args.sprite,
    colliding: false,
  });

  return <Player setPlayerInfo={setPlayerInfo} playerInfo={playerInfo} dimensions={4} />;
};

export const Default = Template.bind({});
Default.args = {
  sprite: 'omori',
};