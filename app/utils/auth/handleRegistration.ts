import { FormEvent } from 'react';

const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData: { [key: string]: string } = {};
  const form = e.currentTarget;

  Array.from(form.elements).forEach((element) => {
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
      const field = element as HTMLInputElement | HTMLSelectElement;
      if (field.name) {
        formData[field.name] = field.value;
      }
    }
  });

  console.log('FormData -> ', formData);

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  return result;
};

export default handleRegistration;
