interface ScrollToOptions extends ScrollIntoViewOptions {
  mode?: "always" | "normal";
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

  switch (_options.mode) {
    case "always":
      trgItem.scrollIntoView(_options);
      break;
    case "normal":
      const containerRect = _options.containerSelector
        ? document
            .querySelector(_options.containerSelector)
            ?.getBoundingClientRect()
        : null;

      if (containerRect) {
        if (
          trgRect.top < containerRect.top ||
          trgRect.bottom > containerRect.bottom
        ) {
          trgItem.scrollIntoView(_options);
        }
      } else if (trgRect.top < 0 || trgRect.bottom > window.innerHeight) {
        trgItem.scrollIntoView(_options);
      }
      break;
  }
}

export const CommonUtiltiy = {
  scrollTo,
};
