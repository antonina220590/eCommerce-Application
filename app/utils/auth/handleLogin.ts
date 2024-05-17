import { LoginPayload } from '@/app/types';

const handleLogin = async (
  formData: LoginPayload,
  setLoginError: (_error: string | null) => void
) => {
  // console.log('Login FormData -> ', formData);
  setLoginError(null);

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log('handleLogin result (utils)', result);

    if (response.ok) {
      return { success: true };
    }
    setLoginError(result?.error);
    return { success: false };
  } catch (error) {
    console.error('Login failed:', error);
    setLoginError('Login failed due to some error');
    return { success: false };
  }
};

export default handleLogin;
