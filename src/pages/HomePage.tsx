import LottiePlayer from 'lottie-react';
import { motion } from 'framer-motion';

import Animation1 from '../assets/images/Animation - 1725014070182.json';
import ImageFile from '../components/ImageFile';

const HomePage = () => {
  return (
    <div className="text-[5679BF] h-[100vh] md:h-[100%] flex flex-col justify-center items-center p-5">
      <div className="">
        <h1 className="text-2xl md:text-4xl text-center lg:text-4xl italic">
          Welcome to
          <span className="text-primary font-bold"> Fund Flow</span>
        </h1>
      </div>

      <div className="md:flex justify-center gap-[190px] md:gap-[55px] items-center mt-[50px] lg:mt-0">
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 20, duration: 5 }}
          initial={{ x: '-100vw', opacity: 0 }}
          className="md:pb-10 flex items-center justify-center"
        >
          <LottiePlayer animationData={Animation1} className="w-[40vw]" />
        </motion.div>

        <div className="mt-10 lg:mt-0 lg:flex lg:flex-col gap-30 items-center">
          <h1 className="text-2xl text-nowrap md:text-4xl mr-12 mb-5 lg:text-3xl italic">
            Transfer
            <span className="text-primary font-bold uppercase"> Funds </span>
            Seamlessly
          </h1>

          <motion.div
            className="flex justify-center"
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 20, duration: 5 }}
            initial={{ x: '100vw', opacity: 0 }}
          >
            <ImageFile />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
