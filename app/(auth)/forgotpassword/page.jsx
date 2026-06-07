import ForgotPassword from '@/app/components/Auth/ForgotPassword';

export const metadata = {
  title: 'Forgot Password',
  description: 'Reset Password',
};

const page = () => {
  return <ForgotPassword />;
};

export default page;
