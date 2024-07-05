// Update chartColors.ts with the new color scheme
export const ranges = [
    { range: "Below 400", color: "#29ABCA" },
    { range: "400 to 430", color: "#9B59B6" },
    { range: "430 to 460", color: "#295BA7" },
    { range: "460 to 490", color: "#F2F2F2" },
    { range: "Above 490", color: "#333333" },
];

export const getColorForRate = (rate: number) => {
    if (rate < 400) return "#29ABCA";
    if (rate <= 430) return "#9B59B6";
    if (rate <= 460) return "#295BA7";
    if (rate <= 490) return "#F2F2F2";
    return "#333333";
};

export const backgroundColors = ranges.map(range => range.color);
export const hoverBackgroundColors = backgroundColors.map(color => color + "DD");