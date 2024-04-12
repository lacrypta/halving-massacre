import Lottie from 'lottie-react';

import animationData from './rocket.json';

const style = {
  height: 185,
  width: 200,
};

export default function Rocket() {
  return <Lottie animationData={animationData} style={style} initialSegment={[60, 72]} />;
}
