export const getContrastColor = hex => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  let brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black for light colors and white for dark colors
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

/**
 * Calcula o tamanho aproximado de uma string quando armazenada no localStorage.
 *
 * @param {string} string - A string cujo tamanho será calculado.
 * @returns {string} Uma string indicando o tamanho da string fornecida no formato de bytes, kilobytes ou megabytes.
 *
 * @example
 * console.log(calculateLocalStorageSize("Hello, world!")); // "28 bytes"
 *
 * @example
 * console.log(calculateLocalStorageSize("a".repeat(2048))); // "4.10 KB"
 */
export const calculateLocalStorageSize = string => {
	// Converte a string para JSON para calcular o tamanho aproximado no localStorage
	const localStorageItem = JSON.stringify(string)
	// Calcula o tamanho da string em bytes usando Blob
	const bytes = new Blob([localStorageItem]).size

	// Verifica o tamanho em bytes e retorna uma string formatada
	if (bytes < 1024) {
		return `${bytes.toLocaleString()} bytes`
	} else if (bytes < 1024 * 1024) {
		// Converte bytes para kilobytes
		const kilobytes = bytes / 1024
		return `${kilobytes.toFixed(2)} KB`
	} else {
		// Converte bytes para megabytes
		const megabytes = bytes / (1024 * 1024)
		return `${megabytes.toFixed(2)} MB`
	}
};