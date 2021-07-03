export default (name: string, defaultValue?: string): string | null => {
  return process.env[name] || defaultValue
}
