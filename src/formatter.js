export const formatFeedback = (feedback) => {
    if (feedback == null) {
        return null;
    }

    const pokemonName = formatName(feedback.payload.item);
    let text = null;
    switch (feedback.payload.actionPerformed) {
        case "add": {
            text = `${pokemonName} added to My Pokemons successfully.`;

            break;
        }
        case "remove": {
            text = `${pokemonName} removed from My Pokemons successfully.`;

            break;
        }
        default: {
            text = "";
        }
    }

    const message = {
        text: text,
        type: feedback.type
    };

    return message;
};

export const formatId = (item) => {
    const id = String(item.id);

    return id.padStart(5, "0");
};

export const formatName = (item) => {
    const name = item.name;

    // It is possible also to use CSS property {text-transform: capitalize;}
    return name.charAt(0).toUpperCase() + name.slice(1);
};
