import ContactUsForm from '../../common/ContactUsForm';

const ContactFormSection = () => {
  return (
    <div className="lg:w-1/2 flex flex-col gap-y-4 text-center mx-auto mb-48">
      <div className="flex flex-col gap-y-2 mb-10">
        <h1 className="text-4xl font-bold text-richblack-5">Get in Touch</h1>
        <p className="text-richblack-400 text-md font-semibold">
          We'd love to here for you, Please fill out this form.
        </p>
      </div>
      <div>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
