import { LoginPayload } from '@/app/types';

const handleLogin = async (formData: LoginPayload) => {
  console.log('Login FormData -> ', formData);

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  console.log(result);
};

export default handleLogin;
