export const convertToDate = (isoTimestamp: string) => {
  const date = new Date(isoTimestamp);

  // Extract individual parts
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getUTCFullYear();

  // Format the date as DD/MM/YYYY
  return `${day}/${month}/${year}`;
};

// Example Usage
const isoTimestamp = '2025-01-05T07:51:12.834Z';
console.log(convertToDate(isoTimestamp)); // Output: "05/01/2025"
