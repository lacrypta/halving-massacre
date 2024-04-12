import Lottie from 'lottie-react';

// import animationData from './pig.json'; // 200x200px
import animationData from './chest.json'; // 200x200px
// import animationData from './bitcoin.json'; // 200x220px
// import animationData from './bitcoin-rotate.json'; // 200x220px

const style = {
  height: 'auto',
  width: 'auto',
};

export default function Treasury() {
  return <Lottie animationData={animationData} style={style} />;
}
