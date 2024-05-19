
import { signIn } from '@/auth';

const LoginPage = () => {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google', { redirectTo: '/user' })
      }}
    >
      <button type='submit'>Login with Google</button>
    </form>
  );
};

export default LoginPage;