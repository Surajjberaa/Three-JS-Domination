precision mediump float; // Set the floating point precision
varying vec2 vUv; // Interpolated vertex texture coordinates
uniform float uTime; // Time passed since the start of the shader
// varying float noise;

//  //	Classic Perlin 3D Noise 
// //	by Stefan Gustavson (https://github.com/stegu/webgl-noise)
// //
//     vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
//     vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
//     vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

//     float cnoise(vec3 P){
//     vec3 Pi0 = floor(P); // Integer part for indexing
//     vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
//     Pi0 = mod(Pi0, 289.0);
//     Pi1 = mod(Pi1, 289.0);
//     vec3 Pf0 = fract(P); // Fractional part for interpolation
//     vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
//     vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
//     vec4 iy = vec4(Pi0.yy, Pi1.yy);
//     vec4 iz0 = Pi0.zzzz;
//     vec4 iz1 = Pi1.zzzz;

//     vec4 ixy = permute(permute(ix) + iy);
//     vec4 ixy0 = permute(ixy + iz0);
//     vec4 ixy1 = permute(ixy + iz1);

//     vec4 gx0 = ixy0 / 7.0;
//     vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
//     gx0 = fract(gx0);
//     vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
//     vec4 sz0 = step(gz0, vec4(0.0));
//     gx0 -= sz0 * (step(0.0, gx0) - 0.5);
//     gy0 -= sz0 * (step(0.0, gy0) - 0.5);

//     vec4 gx1 = ixy1 / 7.0;
//     vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
//     gx1 = fract(gx1);
//     vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
//     vec4 sz1 = step(gz1, vec4(0.0));
//     gx1 -= sz1 * (step(0.0, gx1) - 0.5);
//     gy1 -= sz1 * (step(0.0, gy1) - 0.5);

//     vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
//     vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
//     vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
//     vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
//     vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
//     vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
//     vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
//     vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

//     vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
//     g000 *= norm0.x;
//     g010 *= norm0.y;
//     g100 *= norm0.z;
//     g110 *= norm0.w;
//     vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
//     g001 *= norm1.x;
//     g011 *= norm1.y;
//     g101 *= norm1.z;
//     g111 *= norm1.w;

//     float n000 = dot(g000, Pf0);
//     float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
//     float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
//     float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
//     float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
//     float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
//     float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
//     float n111 = dot(g111, Pf1);

//     vec3 fade_xyz = fade(Pf0);
//     vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
//     vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
//     float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
//     return 2.2 * n_xyz;
//     }

// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
// uniform float uTime;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}




void main() {

    // Example 1

    // vec4 color1 = vec4(0.4471, 0.9882, 0.3765, 1.0);
    // vec4 color2 = vec4(0.3569, 0.9804, 0.898, 1.0);
    // vec4 color3 = vec4(0.9882, 0.3765, 0.3765, 1.0);
    // vec4 color4 = vec4(0.7647, 0.3765, 0.9882, 1.0);

    // vec4 color5 = mix(color1, color2, vUv.x * sin(uTime));
    // vec4 color6 = mix(color3, color4, vUv.x * sin(uTime));  

    // vec4 color = mix(color5, color6, vUv.y * cos(uTime));

    // Example 2

    // vec4 flagColor1 = vec4(1.0, 0.9843, 0.0941, 1.0);
    // vec4 flagColor2 = vec4(0.0588, 0.4667, 1.0, 1.0);

    // float num = step(0.5, vUv.y);

    // vec4 color = mix(flagColor1, flagColor2, num );


    // Example 3


    // vec4 color = vec4(1.0, 0.0, 0.0, 1.0);

    // float n = cnoise(vec3(vUv * 5.0,  uTime * 0.1));
    // color.rgb = vec3(n);  

    // Example 4

    // vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
    // color.rgb += vec3(noise);

    // Example 5

    vec4 color = vec4(vec3(fbm(vUv * 3.0)), 1.0);
    // color += vec4(fbm(vUv*3.));

    gl_FragColor = color;

}