import axios from "axios";

export interface ContactProps {
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  type: "success" | "error";
  message: string;
}

export const handleContact = async (
  formData: ContactProps
): Promise<ContactResponse> => {
  try {
    await axios.post("/users/contact/email", formData, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      type: "success",
      message: "Your message has been delivered",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        type: "error",
        message: error.response?.data?.message || error.message,
      };
    }

    return {
      type: "error",
      message: "Something went wrong. Please try again later",
    };
  }
};
