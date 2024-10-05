import { ButtonProps } from '../constants/types';

const Button = ({
  title,
  loading,

  buttonStyle,
  buttonContainerStyle,
}: ButtonProps) => {
  return (
    <div
      className={
        typeof buttonContainerStyle === 'string'
          ? buttonContainerStyle
          : undefined
      }
      style={
        typeof buttonContainerStyle === 'object'
          ? buttonContainerStyle
          : undefined
      }
    >
      <button
        className={typeof buttonStyle === 'string' ? buttonStyle : undefined}
        style={typeof buttonStyle === 'object' ? buttonStyle : undefined}
      >
        {loading ? 'LOADING...' : `${title}`}
      </button>
    </div>
  );
};

export default Button;
