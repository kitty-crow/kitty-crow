declare const process: {
  readonly env: Readonly<Record<string, string | undefined>>;
};

declare module "node:fs/promises" {
  export function mkdir(
    path: string,
    options: { recursive: true }
  ): Promise<string | undefined>;

  export function writeFile(
    path: string,
    data: string,
    encoding: "utf8"
  ): Promise<void>;
}
