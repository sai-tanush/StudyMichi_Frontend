import ContactUsForm from '../../common/ContactUsForm';

interface ContactFormSectionProps {
  title: string;
  paragraph: string;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  title,
  paragraph,
}) => {
  return (
    <div className="w-[93%] lg:w-fit flex flex-col gap-y-4 -mt-36 lg:-mt-0 text-center mx-auto mb-28 border border-richblack-400 px-6 py-6 lg:p-10 rounded-xl">
      <div className="flex flex-col gap-y-2 mb-10">
        <h1 className="text-xl lg:text-4xl font-bold text-richblack-5">
          {title}
        </h1>
        <p className="text-richblack-400 text-sm lg:text-md font-semibold">
          {paragraph}
        </p>
      </div>
      <div className="w-[60%] lg:w-auto">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
