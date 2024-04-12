import Lottie from 'lottie-react';

// import animationData from './pig.json'; // 200x200px
import animationData from './chest.json'; // 200x200px
// import animationData from './bitcoin.json'; // 160x220px
// import animationData from './bitcoin-rotate.json'; // 160x220px

const style = {
  height: 200,
  width: 200,
};

export default function Treasury() {
  return <Lottie animationData={animationData} style={style} />;
}
