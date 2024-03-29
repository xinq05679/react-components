interface ScrollToOptions extends ScrollIntoViewOptions {
  mode?: "always" | "normal" | "partial-hidden";
  containerSelector?: string;
}

function scrollTo(selector: string, options?: ScrollToOptions) {
  const trgItem = document.querySelector(selector);
  if (!trgItem) return;

  const _options = {
    mode: "normal",
    containerSelector: "",
    behavior: "auto",
    block: "center",
    ...options,
  } as ScrollToOptions;

  const trgRect = trgItem.getBoundingClientRect();

  const containerRect = _options.containerSelector
    ? document
        .querySelector(_options.containerSelector)
        ?.getBoundingClientRect()
    : null;

  const border = {
    top: containerRect?.top || 0,
    bottom: containerRect?.bottom || window.innerHeight,
  };

  switch (_options.mode) {
    case "always":
      trgItem.scrollIntoView(_options);
      break;
    case "normal":
      if (trgRect.top < border.top || trgRect.top > border.bottom) {
        trgItem.scrollIntoView(_options);
      }
      break;
    case "partial-hidden":
      if (trgRect.top < border.top || trgRect.bottom > border.bottom) {
        trgItem.scrollIntoView(_options);
      }
      break;
  }
}

function validateEmail(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export const CommonUtiltiy = {
  scrollTo,
  validateEmail,
};
