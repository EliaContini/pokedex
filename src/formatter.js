export const formatId = (item) => {
    const id = String(item.id);

    return id.padStart(4, "0");
};

export const formatName = (item) => {
    const name = item.name;

    // It is possible also to use CSS property {text-transform: capitalize;}
    return name.charAt(0).toUpperCase() + name.slice(1);;
};
