export const validateInput = (
  input: string,
  type: 'url' | 'text' | 'contact'
): { isValid: boolean; message: string } => {
  if (type === 'url') {
    try {
      // Check if it's a valid URL
      new URL(input);
      return { isValid: true, message: '' };
    } catch (e) {
      return {
        isValid: false,
        message: 'Please enter a valid URL (e.g., https://example.com)',
      };
    }
  }

  // For text and contact, we don't need specific validation
  return { isValid: true, message: '' };
};