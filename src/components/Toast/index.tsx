import { Alert, Snackbar } from "@mui/material";
import { toastDefaultAutoHideDuration } from "../../utils/settings";

type Props = {
  error: string;
  handleCloseError: () => void;
  severity?: "error" | "success" | "info" | "warning"
}

export function Toast({ 
  error, 
  handleCloseError,
  severity = "error",
}: Props) {

  return (
    <Snackbar 
      open={!!error} 
      autoHideDuration={5000} 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleCloseError}
    >
      <Alert variant="filled" severity={severity} sx={{ width: '50%' }} onClose={handleCloseError}>
        {error}
      </Alert>
    </Snackbar>
  );
}
