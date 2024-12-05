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
    <div className="flex flex-col gap-y-4 text-center mx-auto mb-28 border border-richblack-400 p-10 rounded-xl">
      <div className="flex flex-col gap-y-2 mb-10">
        <h1 className="text-4xl font-bold text-richblack-5">{title}</h1>
        <p className="text-richblack-400 text-md font-semibold">{paragraph}</p>
      </div>
      <div>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
