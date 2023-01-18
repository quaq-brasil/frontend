import * as z from "zod";

export const validateEmail = (email: string) => {
  const emailSchema = z.string().email();
  try {
    emailSchema.parse(email);
    return true;
  } catch (err) {
    return false;
  }
};

export const validateNumber = (number: number) => {
  const numberSchema = z.number();

  try {
    numberSchema.parse(number);
    return true;
  } catch (err) {
    return false;
  }
};

export const validateUrl = (url: string) => {
  const urlSchema = z.string().url();

  try {
    urlSchema.parse(url);
    return true;
  } catch (err) {
    return false;
  }
};
