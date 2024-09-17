import { TbError404 } from 'react-icons/tb';

const NotFound = () => {
  return (
    <div className="flex flex-col mt-[-30px] items-center min-h-screen justify-center">
      <p className="text-xl md:text-2xl lg:text-4xl italic font-semibold">
        This resource can not be found
      </p>
      <TbError404 className="text-8xl my-4 text-red-600" />
    </div>
  );
};

export default NotFound;
