export function isValidEmail(email: string): string {
  if (!email) {
    return 'Email address is required';
  }
  const atIndex = email.indexOf('@');
  if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
    return 'Email address must contain an "@" symbol separating local part and domain name';
  }
  const domain = email.substring(atIndex + 1);
  if (!domain || domain.trim() === '' || domain.indexOf('.') === -1) {
    return 'Email address must contain a domain name (e.g., example.com)';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Email address must be properly formatted (e.g., user@example.com)';
  }

  return '';
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
