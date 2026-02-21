interface Window {
  aistudio?: {
    openSelectKey: () => void;
    hasSelectedApiKey: () => Promise<boolean>;
  };
}
