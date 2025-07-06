export const capitalizeName = name =>
    name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());