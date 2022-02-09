let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const size = 1500;
canvas.width = size;
canvas.height = size;

class ComplexNumber {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    add(other) {
        return new ComplexNumber(
            this.real + other.real,
            this.imag + other.imag
        );
    }

    sub(other) {
        return new ComplexNumber(
            this.real - other.real,
            this.imag - other.imag
        );
    }

    mul(other) {
        return new ComplexNumber(
            this.real * other.real - this.imag * other.imag,
            this.real * other.imag + this.imag * other.real
        );
    }

    mod() {
        return Math.sqrt(this.real ** 2 + this.imag ** 2);
    }
}

function mandelbrot(z, c, i) {
    if (z.mod() > 2 || i === 0) return i;

    return mandelbrot(
        z.mul(z).add(c),
        c, 
        i - 1
    );
}

const i = 50;
const colors = [
    [255, 0, 0],
    [255, 128, 0],
    [255, 255, 0],
    [128, 255, 0],
    [0, 255, 0],
    [0, 255, 128],
    [0, 255, 255],
    [0, 128, 255],
    [0, 0, 255],
    [128, 0, 255],
    [255, 0, 255],
    [255, 0, 128]
]

function lerp(a, b, percent) {
    return a + percent * (b - a);
}

let mandelbrotImageData = ctx.createImageData(size, size);

for (let x = 0; x < size; x++)
for (let y = 0; y < size; y++) {
    let z = new ComplexNumber(0, 0);
    let c = new ComplexNumber(
        -1.5 + (x * (2 / size)), 
        -1.0 + (y * (2 / size))
    );
    
    let m = mandelbrot(z, c, i);
    let d = ((y * size) + x) * 4;

    let color = Math.floor(m / i * colors.length);
    let color2 = color - 1;
    if (color2 < 0) {
        color2 = 0;
    }

    mandelbrotImageData.data[d    ] = (m / i) * lerp(colors[color][0], colors[color2][0], m / i);
    mandelbrotImageData.data[d + 1] = (m / i) * lerp(colors[color][1], colors[color2][1], m / i);
    mandelbrotImageData.data[d + 2] = (m / i) * lerp(colors[color][2], colors[color2][2], m / i);
    mandelbrotImageData.data[d + 3] = 255;
}

ctx.putImageData(mandelbrotImageData, 0, 0);