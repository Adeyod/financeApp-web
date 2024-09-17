import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

type PhoneType = {
  value: string;
  setValue: (value: string) => void;
};

const Phone = ({ value, setValue }: PhoneType) => {
  return (
    <div className=" mt-4">
      <label htmlFor="phone_number" className="uppercase font-bold">
        Phone number
      </label>
      <PhoneInput
        className="border p-2"
        placeholder="Enter phone number"
        value={value}
        onChange={(phone) => setValue(phone || '')}
      />
    </div>
  );
};

export default Phone;
