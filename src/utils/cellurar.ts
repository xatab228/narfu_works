
const get_bit = (num: number, pos: number) => (num >> pos) & 1;

const combine = (b1: number, b2: number, b3: number) => (b1 << 2) + (b2 << 1) + (b3 << 0);

const get_rule = (num: number) => (b1: number, b2: number, b3: number) => get_bit(num, combine(b1, b2, b3));

export const drawCellurarAutomation = (canvas: HTMLCanvasElement, rules: number) => {
    const width = canvas.width;
    const height = canvas.height;
    const cell_scale = 1;
    const cells_down = height;
    const cells_across = width;
    const rule = get_rule(rules);
    const context = canvas.getContext('2d');
    restore_cnvs(context as CanvasRenderingContext2D, canvas);
    draw_rule(context as CanvasRenderingContext2D, rule, cell_scale, cells_across, cells_down)
};

function draw_rule(ctx: CanvasRenderingContext2D, rule: any, scale: number, width: number, height: number) {
    let row = initial_row(width);
    for (let i = 0; i < height; i++) {
        draw_row(ctx, row, scale);
        row = next_row(row, rule);
    }
}

function draw_row(ctx: CanvasRenderingContext2D, row: number[], scale: number) {
    ctx.save();
    row.forEach(cell => {
        ctx.fillStyle = cell === 1 ? '#f00' : '#fff';
        ctx.fillRect(0, 0, scale, scale);
        ctx.translate(scale, 0);
    });
    ctx.restore();
    ctx.translate(0, scale);
}

function restore_cnvs(ctx: CanvasRenderingContext2D, cnvs: HTMLCanvasElement) {
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
}

function next_row(old: number[], rule: (b1: number, b2: number, b3: number) => number[]) {
    return old.map((_, i) => rule(old[i - 1], old[i], old[i + 1]));
}

function initial_row(width: number) {
    const initial_row = Array(width).fill(0);
    initial_row[Math.floor(width / 2)] = 1;
    return initial_row;
}