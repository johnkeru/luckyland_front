export default function combineCategories(categories) {
    const categoryNames = categories.map(category => category.name);
    const combinedCategories = categoryNames.join(', ');
    return combinedCategories;
}