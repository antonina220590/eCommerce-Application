import { FormEvent } from 'react';

const handleUserUpdate = async (
  e: FormEvent<HTMLFormElement>,
  setUserUpdateStatus: (_error: string | null) => void
) => {
  // console.log('Login FormData -> ', formData);
  setUserUpdateStatus(null);
  e.preventDefault();

  const formData: { [key: string]: string | boolean } = {};
  const form = e.currentTarget;

  // TODO: refactor - prefer getting data from form component
  Array.from(form.elements).forEach((element) => {
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
      const field = element as HTMLInputElement | HTMLSelectElement;
      if (field.name) {
        if (field.type === 'checkbox') {
          formData[field.name] = (field as HTMLInputElement).checked;
        } else {
          formData[field.name] = field.value;
        }
      }
    }
  });

  // console.log('formData --> ', formData);

  try {
    const response = await fetch('/api/auth/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    // console.log('handleUserUpdate result', result);

    if (response.ok) {
      setUserUpdateStatus(result.message);
      return { success: true };
    }
    setUserUpdateStatus(result?.error);
    return { success: false };
  } catch (error) {
    console.error('UserUpdate failed:', error);
    setUserUpdateStatus('UserUpdate failed due to some error');
    return { success: false };
  }
};

export default handleUserUpdate;
