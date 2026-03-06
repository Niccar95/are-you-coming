const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-9999">
      <div className="w-[100px] h-[100px] rounded-full border-10 border-violet-500 border-t-white animate-spin" />
    </div>
  );
};

export default Spinner;
