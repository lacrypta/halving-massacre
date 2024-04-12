import Lottie from 'lottie-react';
import animationData from './crown.json';

const style = {
  height: 'auto',
  width: 'auto',
};

export default function Crown() {
  return <Lottie animationData={animationData} style={style} />;
}
