import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
import { AudioVisualizer } from "../../Audio/audioAPI";
import rainbowImageImport from "./rainbow-sq.jpg";

let params = {
    rows: 16,
    cols: 16,
    scaleMin: 0.00001,
    scaleMax: 0.1,
    speed: 2,
    frequency: 10,
    amplitude: 50,
    // frame: 0,
    // animate: true,
    lineCap: "round",
    shape: "rectangle",
    toggleFlash: false,
    toggleImage: false,
};

const mapRowCol: any = (rowCol: number) => {
    const dataMap: any = {
        0: 15,
        1: 10,
        2: 8,
        3: 9,
        4: 6,
        5: 5,
        6: 2,
        7: 1,
        8: 0,
        9: 4,
        10: 3,
        11: 7,
        12: 11,
        13: 12,
        14: 13,
        15: 14,
    };
    return dataMap[rowCol];
};

let frame = 0;


export const Noise = (ctx: any) => {
    const init = async () => {
        const audioContext = new AudioContext();

        const processFrame = (data: any) => {
            const width = document.body.clientWidth;
            const height = document.body.clientHeight;

            const values: any = Object.values(data);
            const valuesAverage: any =
                values.reduce((prev: any, curr: any) => prev + curr) / (16 * 5);

            try {
                frame+=0.0001;
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, width, height);
                const localParams = localStorage.getItem("params");

                if (localParams) {
                    params = JSON.parse(localParams);
                }

                ctx.fillStyle = "black";

                let cols = params.cols;
                let rows = params.rows;

                const numCells = rows * cols;

                const gWidth = width * 0.8;
                const gHeight = height * 0.8;
                const cellWidth = gWidth / cols;
                const cellHeight = gHeight / rows;
                const marginX = (width - gWidth) * 0.5;
                const marginY = (height - gHeight) * 0.5;

                var len = numCells;
                // while faster than for loop
                while (len--) {
                    const row = len % cols;
                    const col = Math.floor(len / cols);

                    // let r = typeData[len * 4];
                    // let g = typeData[len * 4 + 1];
                    // let b = typeData[len * 4 + 2];
                    // let a = typeData[len * 4 + 3];

                    // if (params.toggleFlash) {
                    //     r = r + random.range(-100, 100);
                    //     g = g + random.range(-100, 100);
                    //     b = b + random.range(-100, 100);
                    // }

                    const x = cellWidth * row;
                    const y = cellHeight * col;
                    const w = cellWidth * 0.8;
                    const h = cellHeight * 0.8;

                    // const f = params.animate ? frame : params.frame;

                    const n = random.noise3D(
                        x,
                        y,
                        frame,
                        values[mapRowCol(row)] / 300000,
                        values[mapRowCol(col)] / 10 //math.mapRange(0, -1, 1, valuesAverage / 5000, valuesAverage / 500)
                        //amp
                    );

                    const angle = n * Math.PI * valuesAverage;
                    const scale = math.mapRange(
                        n,
                        -1,
                        1,
                        params.scaleMin * values[mapRowCol(row)],
                        params.scaleMax * values[mapRowCol(col)]
                    );

                    //   const scale = valuesAverage / 5;

                    ctx.save();
                    ctx.translate(x, y);
                    ctx.translate(marginX, marginY);
                    ctx.translate(cellWidth * 0.5, cellHeight * 0.5);
                    ctx.rotate(angle);
                    ctx.beginPath();
                    ctx.lineWidth = scale;
                    ctx.lineCap = params.lineCap; //"butt | round | square";

                    ctx.strokeStyle = `rgb(${100},${255},${50})`;

                    ctx.moveTo(w * -0.5, 0);
                    if (params.shape === "rectangle") {
                        ctx.lineTo(w * 0.5, 0);
                    }

                    if (params.shape === "triangle") {
                        // the triangle
                        ctx.beginPath();
                        ctx.moveTo(w * 0.5, w * 0.5);
                        ctx.lineTo(w * 0.5, w);
                        ctx.lineTo(w, w);
                        ctx.closePath();
                    }

                    if (params.shape === "smiley-face") {
                        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
                        ctx.moveTo(110, 75);
                        ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
                        ctx.moveTo(65, 65);
                        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
                        ctx.moveTo(95, 65);
                        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
                    }

                    if (params.shape === "hexagon") {
                        // ctx.moveTo(0, 0);
                        // hexagon
                        let numberOfSides = 6,
                            size = random.range(
                                Number(params.scaleMin),
                                Number(params.scaleMax)
                            ),
                            Xcenter = 25,
                            Ycenter = 25;

                        // ctx.beginPath();
                        ctx.moveTo(
                            Xcenter + size * Math.cos(0),
                            Ycenter + size * Math.sin(0)
                        );
                        var lenSides = numberOfSides;
                        // for (let i = 1; i <= numberOfSides; i += 1) {
                        while (lenSides--) {
                            ctx.lineTo(
                                Xcenter +
                                size * Math.cos((lenSides * 2 * Math.PI) / numberOfSides),
                                Ycenter +
                                size * Math.sin((lenSides * 2 * Math.PI) / numberOfSides)
                            );
                        }
                    }

                    ctx.fill();

                    ctx.stroke();
                    ctx.restore();
                }

            } catch (e) {
                console.log(e);
            }
        };

        const processError = () => {
            console.log("process error");
        };
        const a = new AudioVisualizer(audioContext, processFrame, processError);
    };
    init();
};
