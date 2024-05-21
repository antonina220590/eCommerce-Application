import { FormEvent } from 'react';

const handleRegistration = async (
  e: FormEvent<HTMLFormElement>,
  setRegistrationError: (_error: string | null) => void
) => {
  e.preventDefault();
  setRegistrationError(null);

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

  // console.log('FormData -> ', formData);

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // console.log(response);

    const result = await response.json();

    // console.log(result);
    if (response.ok) {
      // return result;
      return { success: true };
    }

    setRegistrationError(result?.error);
    return { success: false };
  } catch (error) {
    console.error('Registration failed:', error);
    setRegistrationError('Registration failed due to some error');
    return { success: false };
  }
};

export default handleRegistration;
