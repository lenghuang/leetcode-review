import { redirect } from 'next/navigation';

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @param {object} additionalParams - Additional query parameters to encode.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: 'error' | 'success',
  path: string,
  message: string,
  additionalParams: object = {} // Default to empty object
) {
  const queryString = Object.entries(additionalParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
  const queryStringOrEmpty = queryString ? `&${queryString}` : '';
  const fullUrl = `${path}?${type}=${encodeURIComponent(message)}${queryStringOrEmpty}`;
  return redirect(fullUrl);
}
