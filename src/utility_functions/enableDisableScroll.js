export const disableScroll = () => {
    document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";
};

export const enableScroll = () => {
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "hidden";
};