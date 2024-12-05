interface HighlightTextProps {
  text: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text }) => {
  return (
    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#12D7FA]">
      {text}
    </span>
  );
};

export default HighlightText;
