precision highp float;

varying vec2    vUv;

// Macros
#define BAILOUT                 16.0
#define EPSILON                 1e-9
#define PERIOD_CHECK_INTERVAL   20
#define PALETTE_FREQUENCY       5.0
#define PALETTE_TIME_INFLUENCE  0.1
#define BAND_FREQUENCY          200.0
#define BAND_TIME_INFLUENCE     0.2

// Uniforms
uniform vec2    center;
uniform float   zoom;
uniform int     iterations;
uniform vec3    gradient[4];
uniform float   aspectRatio;
uniform float   gradientWeights[4];
uniform float   uTime;

// Procedural gradient formula, credit: Inigo Quilez 
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b * cos(6.283185 * (c * t + d));
}

// Performs interior check on a point c
bool isInterior(in vec2 c) {
    float cr1 = c.x + 1.0;
    float ci2 = c.y * c.y;
    if (cr1 * cr1 + ci2 <= 0.0625) return true;

    float cr14 = c.x - 0.25;
    float q = cr14 * cr14 + ci2;
    if (q * (q + cr14) <= 0.25 * ci2) return true;

    return false;
}

// Performs mandelbrot iterations
float mandelbrot(in vec2 c) {
    vec2 z = vec2(0);
    bool bailout = false;
    vec2 zOld = vec2(0);
    int period = 0;

    int i = 0;
    for (; i < iterations; i++) {
        float zrzi = z.x * z.y;
        float zr2 = z.x * z.x;
        float zi2 = z.y * z.y;

        z.x = zr2 - zi2 + c.x;
        z.y = zrzi + zrzi + c.y;

        if (zr2 + zi2 > BAILOUT) {
            bailout = true;
            break;
        }

        // // Interior detection
        vec2 d = z - zOld;
        if (dot(d, d) < EPSILON) {
            i = iterations;
            break;
        }

        period++;
        if (period > PERIOD_CHECK_INTERVAL) {
            period = 0;
            zOld = z;
        }
    }

    return bailout ? float(i) + 1.0 - log2(log2(dot(z,z))) : float(iterations);
}

void main() {
    vec2 rawUv = vUv;
    vec2 uv = rawUv - 0.5;
    uv *= vec2(aspectRatio, -1);

    // Compute pixel coordinate
    vec2 c = center + uv / zoom;

    // Mandelbrot iteration and normalization
    float iterationsFloat = float(iterations);
    float iters = isInterior(c) ? 1.0 : float(mandelbrot(c)) / iterationsFloat;

    // Color palette sampling
    vec3 color = iters == 1.0 
        ? vec3(0) 
        : palette(
            iters * PALETTE_FREQUENCY, 
            vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 0.5), 
            vec3(1.0, 1.1, 0.5) - vec3(uTime * PALETTE_TIME_INFLUENCE)
        );

    // Banding
    float bandFactor = fract(iters * BAND_FREQUENCY - uTime * BAND_TIME_INFLUENCE);
    float bandDistance = min(bandFactor, 1.0 - bandFactor) * 2.0;
    if (bandDistance < 0.3) {
        color *= bandDistance > 0.1 ? abs(bandDistance - 0.3) + 1.0 : 1.2;
    }

    // Dithering to prevent visible palette banding
    float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453) - 0.5) / 255.0;
    color += dither;
    
    gl_FragColor = vec4(color, 1.0);
}