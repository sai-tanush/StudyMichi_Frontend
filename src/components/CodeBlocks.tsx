import { FaArrowRight } from 'react-icons/fa';
import CTAButton from './Button';
import { TypeAnimation } from 'react-type-animation';

interface CTAButtonProps {
  btnText: string;
  linkto: string;
  active: boolean;
}

interface CodeBlocksProps {
  position: string;
  heading: React.ReactNode;
  subheading: string;
  ctabtn1: CTAButtonProps;
  ctabtn2: CTAButtonProps;
  codeblock: string;
  codeColor: string;
  backgroundGradient: string;
}

const CodeBlocks: React.FC<CodeBlocksProps> = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* Section 1 */}
      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold">{subheading}</div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div
        className={`relative h-full flex flex-row text-[1rem] w-[100%] py-4 lg:w-[500px]`}
      >
        {/* Gradient layer (conditionally applied with absolute positioning) */}
        {backgroundGradient === 'yellow' ? (
          <div
            className={`absolute inset-0 z-20 bg-[radial-gradient(circle_at_30%_30%,_#3d2802,_transparent_60%)] 
            border-t border-l border-richblack-600`}
          ></div>
        ) : (
          <div
            className={`absolute inset-0 z-20 bg-[radial-gradient(circle_at_30%_30%,_#053842,_transparent_60%)] 
            border-t border-r border-richblack-600`}
          ></div>
        )}
        <div className="relative h-[295px] text-center flex flex-col w-[10%] text-[1rem] text-richblack-400 font-inter font-bold opacity-100 z-10">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 z-30 relative`}
        >
          <TypeAnimation
            sequence={[codeblock, 10000, '']}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: 'pre-line',
              display: 'block',
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
