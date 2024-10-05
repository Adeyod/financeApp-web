const TransparentSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black min-h-screen bg-opacity-50 z-50">
      <div className="border-4 border-secondary h-10 w-10 rounded-full border-r-0 border-b-0 animate-spin"></div>
    </div>
  );
};

export default TransparentSpinner;
