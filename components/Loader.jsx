import { Spinner } from "native-base";

const Loader = (accessibilityLabel) => {
  return <Spinner mt={32} accessibilityLabel={accessibilityLabel} size="lg" />;
};

export default Loader;
