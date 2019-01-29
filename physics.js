// test data
const bodies = [
    {mass: 100, x:15, y:15, z:15, vx:0.5, vy:0.5, vz: 0.5, ax: 0.1, ay: 0.1, az: 0},
    {mass: 200, x:1, y:1, z:1, vx:2, vy:2, vz: 2, ax: 0.1, ay: 0.1, az: 0}
];

// units used in system
// distance: astronomical unit (AU)
// mass: solar mass
// time: year

// gravitational constant
// const g = 39.5

class nBodyProblem {
    constructor(params) {
        this.g = params.g;
        this.dt = params.dt;
        this.softeningConstant = params.softeningConstant;

        this.bodies = params.bodies;
    }

    // update the positions of each body for a set time interval, dt
    updatePositionVectors() {
        this.bodies.forEach(body => {
            body.x += body.vx * this.dt;
            body.y += body.vy * this.dt;
            body.z += body.vz * this.dt;
        });
    }
    
    // update the velocities of each body for a set time interval, dt
    updateVelocityVectors() {
        this.bodies.forEach(body => {
            body.vx += body.ax * this.dt;
            body.vy += body.ay * this.dt;
            body.vz += body.az * this.dt;
        });
    }

    // update the acceleraties of each body taking into account all bodies in system
    updateAccelerationVectors() {
        // creates a copy of the bodies array.
        // original array will be altered, copied one will not.
        const bodiesCopy = JSON.parse(JSON.stringify(this.bodies));
    
        this.bodies.forEach(body => {
            body.ax = 0;
            body.ay = 0;
            body.az = 0;
    
            bodiesCopy.forEach(bodyCopy => {
                const dx = bodyCopy.x - body.x;
                const dy = bodyCopy.y - body.y;
                const dz = bodyCopy.z - body.z;
    
                // squared distance between to bodies
                const distSq = dx*dx + dy*dy + dz*dz;
    
                // if the squared distance is zero, assume the body is itself and ignore
                if (distSq != 0) {
                    // gravitational force exerted on each body
                    const f = (this.g * bodyCopy.mass) / (distSq * Math.sqrt(distSq + this.softeningConstant));
        
                    body.ax += dx * f;
                    body.ay += dy * f;
                    body.az += dz * f;
                }
                
            });
        });
    }
}


