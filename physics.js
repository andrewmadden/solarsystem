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
        return this;
    }
    
    // update the velocities of each body for a set time interval, dt
    updateVelocityVectors() {
        this.bodies.forEach(body => {
            body.vx += body.ax * this.dt;
            body.vy += body.ay * this.dt;
            body.vz += body.az * this.dt;
        });
        return this;
    }

    // update the acceleraties of each body taking into account all bodies in system
    updateAccelerationVectors() {
        // creates a copy of the bodies array.
        // original array will be altered, copied one will not.
        const bodiesCopy = JSON.parse(JSON.stringify(this.bodies));
        
        this.bodies.forEach(body => {
            body.ax = 0;
            body.ay = 0;
            body.az = 0;                if (distSq != 0 || !isNaN(distSq)) {
                // gravitational force exerted on each body
                const f = (this.g * bodyCopy.mass) / (distSq * Math.sqrt(distSq + this.softeningConstant));

                body.ax += dx * f;
                body.ay += dy * f;
                body.az += dz * f;
            } 
            
            bodiesCopy.forEach(bodyCopy => {
                const dx = bodyCopy.x - body.x;
                const dy = bodyCopy.y - body.y;
                const dz = bodyCopy.z - body.z;
                
                // squared distance between to bodies
                const distSq = dx*dx + dy*dy + dz*dz;
                console.log(`body ${body.name} body2 ${bodyCopy.name} distSq ${distSq}`);
                
                // if the squared distance is zero, assume the body is itself and ignore
                if (distSq != 0) {
                    // gravitational force exerted on each body
                    const f = (this.g * bodyCopy.m) / (distSq * Math.sqrt(distSq + this.softeningConstant));
                    console.log("force " + f);

                    body.ax += dx * f;
                    body.ay += dy * f;
                    body.az += dz * f;
                }                
            });
        });
        return this;
    }
}

// celestial data
const bodies = [
    {
        name: "Sun",
        m: 1,
        x: -1.50324727873647e-6,
        y: -3.93762725944737e-6,
        z: -4.86567877183925e-8,
        vx: 3.1669325898331e-5,
        vy: -6.85489559263319e-6,
        vz: -7.90076642683254e-7,
        ax: 0, 
        ay: 0,
        az: 0
    },
    {
        name: "Mercury",
        m: 1.65956463e-7,
        x: -0.346390408691506,
        y: -0.272465544507684,
        z: 0.00951633403684172,
        vx: 4.25144321778261,
        vy: -7.61778341043381,
        vz: -1.01249478093275,
        ax: 0, 
        ay: 0,
        az: 0
    },
    {
        name: "Venus",
        m: 2.44699613e-6,
        x: -0.168003526072526,
        y: 0.698844725464528,
        z: 0.0192761582256879,
        vx: -7.2077847105093,
        vy: -1.76778886124455,
        vz: 0.391700036358566,
        ax: 0, 
        ay: 0,
        az: 0
      },
      {
        name: "Earth",
        m: 3.0024584e-6,
        x: 0.648778995445634,
        y: 0.747796691108466,
        z: -3.22953591923124e-5,
        vx: -4.85085525059392,
        vy: 4.09601538682312,
        vz: -0.000258553333317722,
        ax: 0, 
        ay: 0,
        az: 0
    },
    {
        name: "Mars",
        m: 3.213e-7,
        x: -0.574871406752105,
        y: -1.395455041953879,
        z: -0.01515164037265145,
        vx: 4.9225288800471425,
        vy: -1.5065904473191791,
        vz: -0.1524041758922603,
        ax: 0, 
        ay: 0,
        az: 0
    }
];

// units used in system
// distance: astronomical unit (AU)
// mass: solar mass
// time: year

const g = 39.5; // gravitational constant
const dt = 0.008; // time interval 2.92 days
const softeningConstant = 0.15; // fixes problem that bodies are not points in space

const innerSolarSystem = new nBodyProblem({
    g, dt, softeningConstant,
    bodies: JSON.parse(JSON.stringify(bodies))
})

function stepSimulation() {
innerSolarSystem.updatePositionVectors()
                .updateAccelerationVectors()
                .updateVelocityVectors();
}