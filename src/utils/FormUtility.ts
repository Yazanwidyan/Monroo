export function validatePassword(
  password: string,
  confirmPassword: string
): boolean {
  return password.trim() === confirmPassword.trim();
}
