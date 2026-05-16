#version 450

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;
    vec2 uvOffset;
    vec2 uvScale;
    vec4 colorTint;
    vec4 emissiveColor;
    float emissiveStrength;
    float chromaticAberration;
    float scanlines;
    float pixelation;
    float saturation;
    float waveDistortion;
    float time;
} ubo;

layout(location = 0) in vec2 inPosition;
layout(location = 1) in vec3 inColor;
layout(location = 2) in vec2 inTexCoord;

layout(location = 0) out vec3 fragColor;
layout(location = 1) out vec2 fragTexCoord;
layout(location = 2) out vec4 fragTint;
layout(location = 3) out vec4 fragEmissiveColor;
layout(location = 4) out float fragEmissiveStrength;
layout(location = 5) out float fragChromaticAberration;
layout(location = 6) out float fragScanlines;
layout(location = 7) out float fragPixelation;
layout(location = 8) out float fragSaturation;
layout(location = 9) out float fragWaveDistortion;
layout(location = 10) out float fragTime;

void main() {
    gl_Position = ubo.proj * ubo.view * ubo.model * vec4(inPosition, 0.0, 1.0);
    fragColor = inColor;
    fragTexCoord = (inTexCoord * ubo.uvScale) + ubo.uvOffset;
    fragTint = ubo.colorTint;
    fragEmissiveColor = ubo.emissiveColor;
    fragEmissiveStrength = ubo.emissiveStrength;
    fragChromaticAberration = ubo.chromaticAberration;
    fragScanlines = ubo.scanlines;
    fragPixelation = ubo.pixelation;
    fragSaturation = ubo.saturation;
    fragWaveDistortion = ubo.waveDistortion;
    fragTime = ubo.time;
}
