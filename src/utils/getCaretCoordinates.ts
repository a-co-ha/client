const getCaretCoordinates = (fromStart = true) => {
  let x = 16,
    y = 60;
  const isSupported = typeof window.getSelection !== 'undefined';
  if (isSupported) {
    const selection = window.getSelection();

    if (selection && selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      range.collapse(fromStart ? true : false);
      const rect = range.getClientRects()[0];

      if (rect) {
        x = rect.left;
        y = rect.top;
      }
    }
  }
  console.log(x, y);
  return { x, y };
};

export default getCaretCoordinates;
