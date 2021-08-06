class MouseUtils {
  public mousedown = false;

  constructor() {
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private readonly onMouseDown = (_e: MouseEvent) => {
    this.mousedown = true;
  };

  private readonly onMouseUp = (_e: MouseEvent) => {
    this.mousedown = false;
  };
}

export const mouseUtils = new MouseUtils();
