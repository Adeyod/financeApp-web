import { FormType } from '../constants/types';

const Form = ({
  title,
  type,
  required,
  placeholder,
  value,
  setValue,
}: FormType) => {
  return (
    <div className="flex flex-col mt-4">
      <label htmlFor={title} className="uppercase font-bold text-black mb-1">
        {title}
      </label>
      <input
        className="border p-2 "
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Form;
