
export function ucfirst(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function parseErrors(errors: { [key: string]: string[] }): string {
    let result = '';
    for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
            errors[key].forEach(error => {
                result += `${error}\n`;
            });
        }
    }
    return result.trim();
}