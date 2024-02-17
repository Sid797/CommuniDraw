import fs from "fs";
import path from "path";
import { Canvas } from "canvas";

import type { Request , Response } from "express";
import { PixelMessage } from "../types";

export function serveHeatMap(_req: Request, res: Response) {
    const pixels = JSON.parse(fs.readFileSync(path.resolve("./server/storage/pixels.json"), "utf8"));

    // SETUP CANVAS CONSTANTS
    const CANVAS_SIZE = 500;
    const PIXEL_AMOUNT = 25;
    const PIXEL_SIZE = CANVAS_SIZE / PIXEL_AMOUNT;

    const canvas = new Canvas(CANVAS_SIZE, CANVAS_SIZE);
    const ctx = canvas.getContext("2d");

    const {max , pixelAppearances} = getPixelsAppearances(pixels);    

    if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        for (const pixel of Object.keys(pixelAppearances)) {
            const [x, y] = pixel.split("-").map(Number);
            ctx.fillStyle = `rgba(255, 255, 255, ${pixelAppearances[pixel] / max})`;
            ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE , PIXEL_SIZE);
        }
    }

    res.setHeader("Content-Type", "image/png");
    const png = canvas.toBuffer("image/png");
    res.send(png);
}

function getPixelsAppearances(pixels: PixelMessage[]){
    const pixelAppearances:{[key: string]: any} = {};
    let maxPlacedPixelCount = 0;

    for (const pixel of pixels) {
        const key:string = `${pixel.x}-${pixel.y}`;

        if (pixelAppearances[key]) {
            pixelAppearances[key] += 1;
        } else {
            pixelAppearances[key] = 1;
        }

        if (pixelAppearances[key] > maxPlacedPixelCount) {
            maxPlacedPixelCount = pixelAppearances[key];
        }
    }

    return {max: maxPlacedPixelCount, pixelAppearances};
};