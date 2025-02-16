import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

/**
 * Performs user login by making a request to the login endpoint
 * @param {FormSchema} values - Login form values
 * @returns {Promise<Response>} Fetch response from the login request
 */
async function login(values: FormSchema) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  }).then((response) => {
    console.log(
      'Request was sent with cookies:',
      document.cookie.includes('accessToken'),
    );
    return response;
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return await response.json();
}

interface Options {
  onError: (err: Error) => void;
  onSuccess: (r: unknown) => void;
}

export const useLogin = ({ onError, onSuccess }: Options) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
};
