export const mapApps = (payload) => payload.map((item) => {
  const uiProperties = {
    id: item.name,
    links: {
      open: `/apps/${item.name}`,
    },
  };

  return {
    ...uiProperties,
    ...item,
  };
});
