import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Stars — Three.js particle field + 3D geometric shapes with mouse parallax.
 * Used inside the Hero section as the full-screen canvas background.
 */
const Stars = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // ── Renderer ──────────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x050816, 1);

        // ── Scene + Camera ────────────────────────────────────────────────────────
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 5;

        // ── Particle Field ────────────────────────────────────────────────────────
        const count = 4000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorA = new THREE.Color('#915EFF');
        const colorB = new THREE.Color('#00FFFF');

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

            const mix = Math.random();
            const c = colorA.clone().lerp(colorB, mix);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }

        const starsGeo = new THREE.BufferGeometry();
        starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const starsMat = new THREE.PointsMaterial({
            size: 0.04,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
        });

        const stars = new THREE.Points(starsGeo, starsMat);
        scene.add(stars);

        // ── 3D Geometric Shapes ────────────────────────────────────────────────────
        const wireMat = new THREE.MeshStandardMaterial({
            color: 0x915EFF,
            wireframe: true,
            transparent: true,
            opacity: 0.35,
        });
        const wireMat2 = new THREE.MeshStandardMaterial({
            color: 0x00FFFF,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
        });

        const shapes = [
            { geo: new THREE.IcosahedronGeometry(0.7, 1), pos: [-2.5, 0.8, 0], mat: wireMat, speed: 0.008 },
            { geo: new THREE.TorusGeometry(0.6, 0.2, 8, 24), pos: [2.5, -0.8, -1], mat: wireMat2, speed: 0.006 },
            { geo: new THREE.OctahedronGeometry(0.6), pos: [0, -2.2, 1], mat: wireMat, speed: 0.012 },
        ];

        const meshes = shapes.map(({ geo, pos, mat, speed }) => {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(...pos);
            mesh.userData.speed = speed;
            scene.add(mesh);
            return mesh;
        });

        // ── Lights ────────────────────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.3));
        const pointLight = new THREE.PointLight(0x915EFF, 2, 10);
        pointLight.position.set(2, 3, 3);
        scene.add(pointLight);

        // ── Mouse Parallax ─────────────────────────────────────────────────────────
        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
        };
        window.addEventListener('mousemove', onMouseMove);

        // ── Resize ────────────────────────────────────────────────────────────────
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // ── Animation Loop ────────────────────────────────────────────────────────
        let frameId;
        const startTime = Date.now();
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const t = (Date.now() - startTime) / 1000;

            stars.rotation.y = t * 0.03;
            stars.rotation.x = t * 0.01;

            meshes.forEach((mesh) => {
                mesh.rotation.x += mesh.userData.speed;
                mesh.rotation.y += mesh.userData.speed * 0.7;
                mesh.position.y += Math.sin(t * 0.8 + mesh.position.x) * 0.001;
            });

            // Smooth parallax
            scene.rotation.x += (mouseY - scene.rotation.x) * 0.05;
            scene.rotation.y += (mouseX - scene.rotation.y) * 0.05;

            renderer.render(scene, camera);
        };
        animate();

        // ── Cleanup ────────────────────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
        />
    );
};

export default Stars;
