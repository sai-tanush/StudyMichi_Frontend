interface HighlightTextProps {
  text: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text }) => {
  return <span className="font-bold text-blue-100">{text}</span>;
};

export default HighlightText;
