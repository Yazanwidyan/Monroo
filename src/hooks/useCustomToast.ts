import { useToast, UseToastOptions } from "@chakra-ui/react";

interface CustomToastOptions extends UseToastOptions {
  title?: string;
}

const useCustomToast = () => {
  const toast = useToast();
  const showToast = (
    description: string,
    {
      position = "bottom",
      title = "",
      status = "info",
      duration = 3000,
      isClosable = true,
    }: CustomToastOptions = {}
  ) => {
    toast({
      position,
      title,
      description,
      status,
      duration,
      isClosable,
    });
  };

  return { showToast };
};

export default useCustomToast;
