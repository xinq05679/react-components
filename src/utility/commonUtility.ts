function scrollTo(selector: string, options?: ScrollIntoViewOptions) {
  const trgItem = document.querySelector(selector);
  if (!trgItem) return;

  const rect = trgItem.getBoundingClientRect();
  if (rect.top < 0 || rect.bottom > window.innerHeight) {
    trgItem.scrollIntoView(
      options || {
        behavior: "auto",
        block: "center",
      }
    );
  }
}

export const CommonUtiltiy = {
  scrollTo,
};
