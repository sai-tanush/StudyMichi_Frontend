import * as Icons from 'react-icons/vsc';

interface IconBtnProps {
  text: string; // The text to be displayed on the button.
  onclick?: () => void; // Optional click handler function.
  children?: React.ReactNode; // Optional ReactNode for nested content.
  disabled?: boolean; // Optional flag to disable the button.
  outline?: boolean; // Optional flag to indicate if the button should have an outline.
  customClasses?: string; // Optional additional custom CSS classes.
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']; // HTML button types (e.g., "button", "submit").
  iconName?: keyof typeof Icons; // The name of the icon from react-icons/vsc.
}

const IconBtn: React.FC<IconBtnProps> = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
  iconName,
}) => {
  // Retrieve the Icon component dynamically based on iconName
  const Icon = iconName ? Icons[iconName] : null;

  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`h-fit px-6 py-2 font-semibold rounded-lg ${customClasses} ${
        outline
          ? 'border border-yellow-50 text-richblack-5 bg-transparent'
          : 'bg-yellow-50 text-richblack-900'
      } `}
    >
      {children ? (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-lg" />} {/* Render the icon */}
          <span>{text}</span>
          {children}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-lg" />} {/* Render the icon */}
          <span>{text}</span>
        </div>
      )}
    </button>
  );
};

export default IconBtn;
