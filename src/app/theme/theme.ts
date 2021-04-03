export interface Theme {
    name: string;
    properties: any;
  }

  export const light: Theme = {
    name: "light",
    properties: {
      "--foreground-default": "#08090A",
      "--foreground-secondary": "#41474D",
      "--foreground-tertiary": "#797C80",
      "--foreground-quaternary": "#F4FAFF",
      "--foreground-light": "#41474D",

      "--background-default": "#F4FAFF",
      "--background-secondary": "#A3B9CC",
      "--background-tertiary": "#5C7D99",

      "--background-navbar": "linear-gradient(135deg,#c2bfbf,#73b1eb,#0272d400)",
      "--background-cards":  "linear-gradient(135deg,#73b1eb85,#0272d400)",
      "--color-text": "#343a40",
      "--color-text-hover": "#41474d",
      "--color-text-active": "#000000",


      "--primary-default": "#5DFDCB",
      "--primary-dark": "#24B286",
      "--primary-light": "#B2FFE7",

      "--error-default": "#EF3E36",
      "--error-dark": "#800600",
      "--error-light": "#FFCECC",

      "--background-tertiary-shadow": "0 1px 3px 0 rgba(92, 125, 153, 0.5)"
    }
  };

  export const dark: Theme = {
    name: "dark",
    properties: {
      "--foreground-default": "#5C7D99",
      "--foreground-secondary": "#A3B9CC",
      "--foreground-tertiary": "#F4FAFF",
      "--foreground-quaternary": "#E5E5E5",
      "--foreground-light": "#FFFFFF",

      "--background-default": "#797C80",
      "--background-secondary": "#41474D",
      "--background-tertiary": "#08090A",
      "--background-light": "#41474D",


      "--background-navbar": "linear-gradient(135deg,#111111,#2e465c,#0272d400)",
      "--background-cards":  "linear-gradient(135deg,#2e465c85,#0272d400)",
      "--color-text": "#ffffff",
      "--color-text-hover": "#b9b9b9",
      "--color-text-active": "#ffffff",


      "--primary-default": "#5DFDCB",
      "--primary-dark": "#24B286",
      "--primary-light": "#B2FFE7",

      "--error-default": "#EF3E36",
      "--error-dark": "#800600",
      "--error-light": "#FFCECC",

      "--background-tertiary-shadow": "0 1px 3px 0 rgba(8, 9, 10, 0.5)"
    }
  };

  export const blue: Theme = {
    name: "blue",
    properties: {
      "--foreground-default": "#5C7D99",
      "--foreground-secondary": "#A3B9CC",
      "--foreground-tertiary": "#F4FAFF",
      "--foreground-quaternary": "#E5E5E5",
      "--foreground-light": "#FFFFFF",

      "--background-navbar": "linear-gradient(135deg,#022c6b,#0576da,#0272d400)",
      "--background-cards":  "linear-gradient(135deg,#0576da85,#0272d400)",
      "--color-text": "#ffffff",
      "--color-text-hover": "#b9b9b9",
      "--color-text-active": "#ffffff",

      "--background-default": "#797C80",
      "--background-secondary": "#41474D",
      "--background-tertiary": "#08090A",
      "--background-light": "#41474D",

      "--primary-default": "#5DFDCB",
      "--primary-dark": "#24B286",
      "--primary-light": "#B2FFE7",

      "--error-default": "#EF3E36",
      "--error-dark": "#800600",
      "--error-light": "#FFCECC",

      "--background-tertiary-shadow": "0 1px 3px 0 rgba(8, 9, 10, 0.5)"
    }
  };
