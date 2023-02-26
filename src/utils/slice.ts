export const slice = (input: string | undefined): string => {
    if (input === undefined) {
        return '';
    }
    
    if (input.length <= 5) {
        return input;
    }

    return `${input.slice(0, 5)}...`;
}