function truncateString(input: string, maxLength: number = 25): string {
  if (input.length <= maxLength) {
    return input;
  }
  return input.slice(0, maxLength - 3) + "...";
}

export default truncateString;
