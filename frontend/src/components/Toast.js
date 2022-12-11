import toast from "react-hot-toast";

export const toastError = (error) => {
  toast.error(error, {
    duration: 4000,
    position: "top-center",
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};
