import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
import { AudioVisualizer } from "../../../Audio/audioAPI";
import rainbowImageImport from "./rainbow-sq.jpg";
import { drawHexagon, drawRectangle, drawSmiley, drawTriangle } from "../../../Utils/shapes";
import { NoiseParams } from "./NoiseVisualiser";

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



export const Noise = (canvasRef: React.RefObject<HTMLCanvasElement>, params: NoiseParams) => {
    const audioContext = new AudioContext();

    const rect = canvasRef && canvasRef.current ? canvasRef.current.getBoundingClientRect() : null;
    const width = rect && rect.width ? rect.width : 0;
    const height = rect && rect.height ? rect.height : 0;


    const processFrame = (data: Uint8Array) => {

        const values = Object.values(data);
        const valuesAverage =
            values.reduce((prev: any, curr: any) => prev + curr) / (16 * 5);

        const ctx = canvasRef.current ? canvasRef.current.getContext("2d") : null;

        if (!ctx) {
            console.log("no canvas context found");
            return [params.fftSize, params.smoothingConstant];
        }
        try {
            frame += params.speed / 20;
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
                    params.amplitude / 10000,
                    params.frequency / 10 //math.mapRange(0, -1, 1, valuesAverage / 5000, valuesAverage / 500)
                    //amp
                );

                const angle = n * Math.PI * valuesAverage;
                const scale = math.mapRange(
                    n,
                    -1,
                    1,
                    (params.scaleMin / 250) * valuesAverage,
                    (params.scaleMax / 250) * valuesAverage
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

                ctx.strokeStyle = `rgb(${(params.color.r * (scale / 10))},${params.color.g * (scale / 10)},${params.color.b * (scale / 10)})`

                ctx.moveTo(w * -0.5, 0);
                if (params.shape === "rectangle") {
                    drawRectangle(ctx, w);
                }

                else if (params.shape === "triangle") {
                    drawTriangle(ctx, w)
                }

                else if (params.shape === "smiley-face") {
                    drawSmiley(ctx, w);
                }

                else if (params.shape === "hexagon") {
                    drawHexagon(ctx, Number(params.scaleMin / 200),
                        Number(params.scaleMax / 200))
                }

                else if (params.shape = "all") {
                    const randy = Math.random();
                    if (randy < 0.3) {
                        drawRectangle(ctx, w);
                    }
                    else if (randy < 0.6) {
                        drawTriangle(ctx, w)
                    }
                    else if (randy < 0.9999) {
                        drawHexagon(ctx, Number(params.scaleMin / 200),
                            Number(params.scaleMax / 200))
                    } else {
                        drawSmiley(ctx, w);

                    }
                }

                ctx.fill();

                ctx.stroke();
                ctx.restore();

            }

        } catch (e) {
            console.log(e);
        }
        return [params.fftSize, params.smoothingConstant]
    };

    const processError = () => {
        console.log("process error");
    };

    new AudioVisualizer(audioContext, processFrame, processError);
};
