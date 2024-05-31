export default function removeAddOnsIfFree(addOns, accommodation) {
    return addOns.filter(addOn => !accommodation.items.some(item => item.name === addOn.name));
}

