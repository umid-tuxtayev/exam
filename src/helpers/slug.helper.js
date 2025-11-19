const slugify = require("slugify");
const Category = require("../models/Catigoria.model.js");

async function generateSlug(name) {
    let baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (await Category.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}

module.exports = generateSlug;
