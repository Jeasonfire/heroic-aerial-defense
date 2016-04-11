class Particle {
    public rgb: [number, number, number];
    public x: number;
    public y: number;
    public x_velocity: number;
    public y_velocity: number;
    public x_acceleration: number;
    public y_acceleration: number;

    private lifetime: number;
    private lifetime_timestamp: number;

    public constructor(rgb: [number, number, number], lifetime: number,
            x: number, y: number,
            x_velocity: number, y_velocity: number,
            x_acceleration: number = 0, y_acceleration: number = 0) {
        this.rgb = rgb;
        this.x = x;
        this.y = y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.x_acceleration = x_acceleration;
        this.y_acceleration = y_acceleration;
        this.lifetime = lifetime;
        this.lifetime_timestamp = Time.total_ms;
    }

    public update() {
        this.x_velocity += this.x_acceleration * Time.delta;
        this.y_velocity += this.y_acceleration * Time.delta;
        this.x += this.x_velocity * Time.delta;
        this.y += this.y_velocity * Time.delta;
    }

    public get_alpha(): number {
        return (1.0 - (Time.total_ms - this.lifetime_timestamp) / this.lifetime);
    }
}

class ParticleManager {
    private static particles: Particle[] = [];

    public static burst(x: number, y: number, lifetime: number = 1.0, count: number = 10, force: number = 100, randomness: number = 0.75, rgb: [number, number, number] = [1.0, 1.0, 1.0]) {
        let angle_offset = 2.0 * Math.PI * Math.random();
        for (let i = 0; i < count; i++) {
            let angle = 2.0 * Math.PI * i / count + angle_offset;
            ParticleManager.particles.push(new Particle(rgb, 1000.0 * lifetime, x, y,
                Math.cos(angle) * force * (1 - Math.random() * randomness),
                Math.sin(angle) * force * (1 - Math.random() * randomness)));
        }
    }

    public static render(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < ParticleManager.particles.length; i++) {
            let particle: Particle = ParticleManager.particles[i];
            particle.update();
            if (particle.x < -offset_x || particle.x >= 64 - offset_x || particle.y < -offset_y || particle.y >= 64 - offset_y || particle.get_alpha() <= 0) {
                ParticleManager.particles.splice(i, 1);
            } else {
                draw_rect(ctx, particle.x, particle.y, 1, 1, "rgba(" + particle.rgb[0] * 255 + ", " + particle.rgb[1] * 255 + ", " + particle.rgb[2] * 255 + ", " + particle.get_alpha() + ")");
            }
        }
    }
}
