import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { callingCountries } from 'country-data';
import { apiConnector } from '../../services/apisconnector';
import { contactusEndpoint } from '../../services/apis';
import Spinner from './Spinner';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  countryCode?: string;
}

const ContactUsForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>();
  const countries = callingCountries.all;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data: FormData) => {
    console.log('About Us Form Data = ', data);
    try {
      setLoading(true);
      const response = await apiConnector({
        method: 'POST',
        url: contactusEndpoint.CONTACT_US_API,
        bodyData: data,
      });
      console.log('Logging AboutUs Page response = ', response);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error occurred = ', error.message);
      } else {
        console.log(
          'An unexpected Error occured in AboutUs page componrnt submitCantactForm function',
          error,
        );
      }

      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <div className="w-[20%] flex justify-center items-center mx-auto lg:-mt-[200px]">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={handleSubmit(submitContactForm)}>
          {/* name  */}
          <div className="flex justify-between gap-x-5 mb-5">
            <div className="flex flex-col gap-y-2 w-[48%] ">
              <label
                htmlFor="firstname"
                className="text-richblack-25 text-sm text-left"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                placeholder="Enter First Name"
                className="bg-richblack-800 p-3 rounded-lg text-richblack-100"
                {...register('firstName', {
                  required: 'First name is required',
                })}
              />
              {errors.firstName && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-[48%]">
              <label
                htmlFor="lastname"
                className="text-richblack-25 text-sm text-left"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Enter Last Name"
                className="bg-richblack-800 p-3 rounded-lg text-richblack-100"
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          {/* email */}
          <div className="flex flex-col gap-y-2 mb-5">
            <label
              htmlFor="email"
              className="text-richblack-25 text-sm text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              className="bg-richblack-800 p-3 rounded-lg text-richblack-100"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* phoneNumber */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phonenumber"
              className="text-richblack-25 text-sm text-left"
            >
              Phone Number
            </label>

            <div className="flex flex-row gap-5">
              {/* dropdown */}
              <div>
                <select
                  id="dropdown"
                  className="bg-richblack-800 p-3 rounded-lg text-richblack-100 w-[70px] lg:w-[120px]"
                  defaultValue="+91-India"
                  {...register('countryCode', { required: true })}
                >
                  {countries.map((country, index) => {
                    return (
                      <option key={index}>
                        {country.countryCallingCodes[0]} - {country.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* phoneNumber */}
              <input
                type="text"
                id="phonenumber"
                placeholder="12345 56789"
                className="bg-richblack-800 p-3 rounded-lg text-richblack-100 w-[80%] lg:w-full"
                {...register('phoneNumber', {
                  required: 'Phone Number is required',
                  minLength: { value: 8, message: 'Invalid Phone Number' },
                  maxLength: { value: 10, message: 'Invalid Phone Number' },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter a valid 10-digit phone number',
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* message */}
          <div className="flex flex-col gap-y-2 mb-5">
            <label
              htmlFor="message"
              className="text-richblack-25 text-sm text-left"
            >
              Message
            </label>
            <textarea
              id="message"
              cols={30}
              rows={7}
              placeholder="Enter your message"
              className="bg-richblack-800 p-3 rounded-lg text-richblack-100"
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && (
              <span className="text-sm text-red-500 mt-1">
                {errors.message.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUsForm;
