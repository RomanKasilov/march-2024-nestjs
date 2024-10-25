export class TransformHelper {
  public static toLowerCase({ value }: { value: string }) {
    return value ? value.toString().toLowerCase() : value;
  }
  public static trim({ value }: { value: string }) {
    return value ? value.toString().trim() : value;
  }
}
