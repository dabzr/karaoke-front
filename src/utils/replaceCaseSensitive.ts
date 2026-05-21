
export function replaceCaseSensitive(text: string, pattern: string) {
    const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const regex = new RegExp(pattern, 'gi');

    return normalizedText.replace(regex, '').replace(/\s+/g, ' ').trim();
}
