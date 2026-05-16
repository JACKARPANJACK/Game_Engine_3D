#version 450
layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) in vec4 fragTint;
layout(location = 3) in vec4 fragEmissiveColor;
layout(location = 4) in float fragEmissiveStrength;
layout(location = 5) in float fragChromaticAberration;
layout(location = 6) in float fragScanlines;
layout(location = 7) in float fragPixelation;
layout(location = 8) in float fragSaturation;
layout(location = 9) in float fragWaveDistortion;
layout(location = 10) in float fragTime;

layout(binding = 1) uniform sampler2D texSampler;

layout(location = 0) out vec4 outColor;

void main() {
    vec2 uv = fragTexCoord;

    // Wave Distortion (Time-based UV Offset)
    if (fragWaveDistortion > 0.0) {
        uv.x += sin(uv.y * 20.0 + fragTime * 5.0) * fragWaveDistortion;
    }

    // Pixelation / Mosaic
    if (fragPixelation > 0.0) {
        uv = floor(uv * fragPixelation) / fragPixelation;
    }

    // Chromatic Aberration
    float r = texture(texSampler, uv + vec2(fragChromaticAberration, 0.0)).r;
    float g = texture(texSampler, uv).g;
    float b = texture(texSampler, uv - vec2(fragChromaticAberration, 0.0)).b;
    float a = texture(texSampler, uv).a;

    vec4 texColor = vec4(r, g, b, a);
    vec4 finalColor = texColor * vec4(fragColor, 1.0) * fragTint;

    // Independent Emissive Addition
    if (a > 0.0 && fragEmissiveStrength > 0.0) {
        vec3 emissivePart = fragEmissiveColor.rgb * fragEmissiveStrength;
        finalColor.rgb += emissivePart;
    }

    // Saturation
    if (fragSaturation != 1.0) {
        float luminance = dot(finalColor.rgb, vec3(0.299, 0.587, 0.114));
        finalColor.rgb = mix(vec3(luminance), finalColor.rgb, fragSaturation);
    }

    // Scanlines
    if (fragScanlines > 0.0) {
        // use gl_FragCoord to apply screen-space scanlines
        float scanlineFactor = sin(gl_FragCoord.y * 3.0) * 0.5 + 0.5;
        // interpolate based on intensity
        float intensity = mix(1.0, scanlineFactor, fragScanlines);
        finalColor.rgb *= intensity;
    }

    outColor = finalColor;
}
