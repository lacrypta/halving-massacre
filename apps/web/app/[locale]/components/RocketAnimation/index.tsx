import Lottie from 'lottie-react';

import animationData from './rocket.json';

const style = {
  height: 'auto',
  width: 'auto',
};

export default function Rocket() {
  return <Lottie animationData={animationData} style={style} initialSegment={[60, 72]} />;
}
