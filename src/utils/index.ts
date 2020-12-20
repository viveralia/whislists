export interface ErrorHandlingOptions {
  showAlert: boolean;
}

const defaultOptions: ErrorHandlingOptions = {
  showAlert: true,
};

export function handleServerError(error: Error, options = defaultOptions) {
  console.error(error);
  options.showAlert && alert(error.message);
}
