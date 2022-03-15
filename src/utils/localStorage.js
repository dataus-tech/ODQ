export const fetchSettings = () => {
  return JSON.parse(localStorage.getItem('odq-setting')) ?? {};
};

export const updateSettings = nextSettings => {
  const settings = fetchSettings();
  localStorage.setItem('odq-setting', JSON.stringify({ ...settings, ...nextSettings }));
};
