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
    <div className="text-richblack-5 bg-richblack-800">
      <div>
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
        <div>
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button onClick={modalData.btn2Handler}>{modalData?.btn2Text}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
