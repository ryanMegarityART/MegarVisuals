import random from "canvas-sketch-util/random";

export const drawRectangle = (context: any, size: number) => {
    context.lineTo(size * 0.5, 0);
}

export const drawTriangle = (context: any, size: number) => {
    context.beginPath();
    context.moveTo(size * 0.5, size * 0.5);
    context.lineTo(size * 0.5, size);
    context.lineTo(size, size);
    context.closePath();
}

export const drawSmiley = (context: any, size: number) => {
    context.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    context.moveTo(110, 75);
    context.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    context.moveTo(65, 65);
    context.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    context.moveTo(95, 65);
    context.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
}

export const drawHexagon = (context: any, scaleMin: number, scaleMax: number) => {
    // ctx.moveTo(0, 0);
    // hexagon
    let numberOfSides = 6,
        size = random.range(
            Number(scaleMin),
            Number(scaleMax)
        ),
        Xcenter = 25,
        Ycenter = 25;

    // ctx.beginPath();
    context.moveTo(
        Xcenter + size * Math.cos(0),
        Ycenter + size * Math.sin(0)
    );
    var lenSides = numberOfSides;
    // for (let i = 1; i <= numberOfSides; i += 1) {
    while (lenSides--) {
        context.lineTo(
            Xcenter +
            size * Math.cos((lenSides * 2 * Math.PI) / numberOfSides),
            Ycenter +
            size * Math.sin((lenSides * 2 * Math.PI) / numberOfSides)
        );
    }
}

export const shapeOptions = [
    { value: "rectangle", label: "Rectangle" },
    { value: "triangle", label: "Triangle" },
    { value: "hexagon", label: "Hexagon" },
    { value: "smiley-face", label: "Smiley Face" },
    { value: "all", label: "All of the above..." }
];