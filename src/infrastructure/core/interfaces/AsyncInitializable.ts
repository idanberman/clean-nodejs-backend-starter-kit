export interface AsyncInitializable {
  asyncInit(): Promise<void>;
}
