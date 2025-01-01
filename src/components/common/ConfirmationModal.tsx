import IconBtn from './IconBtn';

export interface ModalDataProps {
  text1: string;
  text2: string;
  btn1Text: string;
  btn2Text: string;
  btn1Handler: () => void;
  btn2Handler: () => void;
}

interface ConfirmationModalProps {
  modalData: ModalDataProps;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ modalData }) => {
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen z-50 backdrop-blur-sm bg-[rgba(255,255,255,0.2)]">
      <div className="bg-richblack-900 p-7 rounded-lg">
        <p className="text-2xl font-semibold text-richblack-5 text-left">
          {modalData.text1}
        </p>
        <p className="text-sm font-semibold text-richblack-300 my-1">
          {modalData.text2}
        </p>
        <div className="mt-5">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="h-fit px-6 py-2 bg-richblack-300 text-richblack-900 rounded-lg ml-4"
            onClick={modalData.btn2Handler}
          >
            {modalData?.btn2Text || 'N/A'}

          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
