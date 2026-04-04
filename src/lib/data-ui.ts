const NON_ALPHANUMERIC = /[^a-z0-9]+/g;
const MULTIPLE_DASHES = /-+/g;

export function toUiKey(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(NON_ALPHANUMERIC, '-')
    .replace(MULTIPLE_DASHES, '-')
    .replace(/^-+|-+$/g, '');
}

export function dataUiPath(...parts: Array<string | number | null | undefined>) {
  return parts
    .filter((part): part is string | number => part !== null && part !== undefined && part !== '')
    .map((part) => (typeof part === 'number' ? String(part) : toUiKey(part)))
    .join('.');
}
