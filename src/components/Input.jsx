import InputMask from "react-input-mask";

const Input = ({ title, subtitle, mask, ...props }) => {
  const inputStyle =
    "border-2 border-gray-100 rounded-xl p-4 mt-1 bg-white";
  return (
    <div className="my-2 flex flex-col w-full">
      <label className=" text-black font-medium">
        {title}:
        {subtitle && (
          <span className="text-xs font-bold text-gray-400">{subtitle}</span>
        )}
      </label>
      {mask ? (
        <InputMask className={inputStyle} mask={mask} {...props} />
      ) : (
        <input className={inputStyle} {...props} />
      )}
    </div>
  );
};

export default Input;
