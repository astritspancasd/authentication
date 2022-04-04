import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "../ui/SnackbarUtils";

export const NotificationProvider = (props) => {
  const { children } = props;

  return (
    <SnackbarProvider domRoot={document.getElementById("react-notification")}>
      <SnackbarUtilsConfigurator />
      {children}
    </SnackbarProvider>
  );
};
