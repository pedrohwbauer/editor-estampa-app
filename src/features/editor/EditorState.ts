export class EditorState {
  private static instance: EditorState;

  private constructor(
    public mode: "select" | "rect" | "line",
    public color: string,
    public strokeWidth: number
  ) {}

  public static getInstance(): EditorState {
    if (!EditorState.instance) {
      EditorState.instance = new EditorState("select", "black", 3);
    }

    return EditorState.instance;
  }
}
