export const mapUser = (payload) => {
  const uiProperties = {
    links: {},
  };

  return { ...uiProperties, ...payload };
};
