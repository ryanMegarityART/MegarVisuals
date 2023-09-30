export const reactSelectStyles = {
  control: (baseStyles: any, _state: any) => ({
    ...baseStyles,
    backgroundColor: "black",
    color: "white",
  }),
};

export const reactSelectTheme = (theme: any) => {
  return {
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary25: "#ed9de6",
      primary: "hotpink",
      neutral0: "black",
    },
  };
};
