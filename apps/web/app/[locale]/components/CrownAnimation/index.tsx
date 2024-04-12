import Lottie from 'lottie-react';

import animationData from './crown.json';

const style = {
  height: 190,
  width: 220,
};

export default function Crown() {
  return <Lottie animationData={animationData} style={style} />;
}
