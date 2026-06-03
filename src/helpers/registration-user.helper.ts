import { type RegistrationUser } from "../pages";

const EMAIL_DOMAIN = "example.com";
const EMAIL_PREFIX = "registration";

export function createUniqueEmail(
  prefix = EMAIL_PREFIX,
  timestamp = Date.now().toString(),
): string {
  return `${prefix}.${timestamp}@${EMAIL_DOMAIN}`;
}

export function createRegistrationUser(): RegistrationUser {
  const timestamp = Date.now().toString();
  const uniqueEmail = createUniqueEmail(EMAIL_PREFIX, timestamp);

  return {
    email: uniqueEmail,
    password: `Test#${timestamp.slice(-6)}Aa1`,
  };
}
