const getCaretCoordinates = (fromStart = true) => {
  let x = 0,
    y = 0;
  const isSupported = typeof window.getSelection !== 'undefined';

  if (isSupported) {
    const selection = window.getSelection();

    if (selection) {
      const range = selection.getRangeAt(0).cloneRange();
      const rect = range.getBoundingClientRect();
      range.deleteContents();
      if (rect) {
        x = rect.x;
        y = rect.y;
      }
    }
  }
  return { x, y };
};

export default getCaretCoordinates;
