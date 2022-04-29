uniform float uTime;
varying vec3 vNormal;

varying vec2 vUv;

void main()
{
    float diff = dot(vec3(1.), vNormal);
    gl_FragColor = vec4(vec3(abs(diff)), 1.);
}