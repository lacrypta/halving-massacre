export function removeObjectKeys(
  obj1: { [key: string]: number },
  obj2: { [key: string]: number },
): { [key: string]: number } {
  // Create a copy of obj1 to avoid modifying the original object
  const result = { ...obj1 };

  // Iterate over the keys of obj2
  Object.keys(obj2).forEach((key) => {
    // If the key exists in result (copy of obj1), delete it

    if (Object.hasOwn(result, key)) {
      delete result[key];
    }
  });

  // Return the modified copy of obj1
  return result;
}
