export function isValidEmail(mail: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(mail);
}

export function isValidPassword(pass: string): string {
  if (!pass) {
    return 'Password is required';
  }
  if (pass.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/[A-Z]/.test(pass)) {
    return 'Password must contain at least one uppercase letter (A-Z)';
  }
  if (!/[a-z]/.test(pass)) {
    return 'Password must contain at least one lowercase letter (a-z)';
  }
  if (!/\d/.test(pass)) {
    return 'Password must contain at least one digit (0-9)';
  }
  if (!/[!@#$%^&*]/.test(pass)) {
    return 'Password must contain at least one special character (!@#$%^&*)';
  }
  if (pass !== pass.trim()) {
    return 'Password must not contain leading or trailing whitespace';
  }
  return '';
}
