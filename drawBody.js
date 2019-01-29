class drawBody {
    constructor(ctx, trailLength, radius) {
        this.ctx = ctx;
        this.trailLength = trailLength;
        this.radius = radius;
        this.positions = [];
    }

    storePosition(x, y) {
        this.positions.push({x, y});
        if (this.positions.length > this.trailLength) this.positions.shift();
    }

    draw(x, y) {
        this.storePosition(x, y);

        for (let i = 0; i < this.positions.length; i++) {
            let transparency;
            let circleScaleFactor;

            const scaleFactor = ( i + 1 ) / this.positions.length;

            circleScaleFactor = scaleFactor;
            if (scaleFactor != 1) {
                transparency = scaleFactor / 2;
            } else {
                transparency = scaleFactor;
            }

            this.ctx.beginPath();
            this.arc(
                this.positions[i].x,
                this.positions[i].y,
                circleScaleFactor * this.radius, 
                0,
                2 * Math.PI
            );

            this.ctx.fillStyle = `rgb(0, 12, 153, ${transparency})`;
            this.ctx.fill();
        }
    }
}