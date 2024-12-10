interface IconBtnProps {
  text: string; // The text to be displayed on the button.
  onclick?: () => void; // Optional click handler function.
  children?: React.ReactNode; // Optional ReactNode for nested content.
  disabled?: boolean; // Optional flag to disable the button.
  outline?: boolean; // Optional flag to indicate if the button should have an outline.
  customClasses?: string; // Optional additional custom CSS classes.
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']; // HTML button types (e.g., "button", "submit").
}

const IconBtn: React.FC<IconBtnProps> = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`${customClasses} ${outline ? 'outline-1' : 'outline-none'}`}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
