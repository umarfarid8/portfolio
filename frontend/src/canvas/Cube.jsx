import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Cube — A 3D rotating cube/box rendered with raw Three.js.
 * Each face has a different gradient color. Used in the About section.
 */
const Cube = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const W = canvas.clientWidth || 360;
        const H = canvas.clientHeight || 360;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
        camera.position.z = 4;

        // Create a cube with per-face materials
        const faceColors = [
            0x915EFF, // right  — violet
            0x6a3fd4, // left   — dark violet
            0x00FFFF, // top    — cyan
            0x00bbbb, // bottom — dark cyan
            0xb44dff, // front  — light violet
            0x3450de, // back   — blue
        ];

        const materials = faceColors.map(
            (c) =>
                new THREE.MeshStandardMaterial({
                    color: c,
                    wireframe: false,
                    roughness: 0.3,
                    metalness: 0.6,
                    transparent: true,
                    opacity: 0.85,
                })
        );

        const geo = new THREE.BoxGeometry(2, 2, 2);
        const cube = new THREE.Mesh(geo, materials);
        scene.add(cube);

        // Wireframe overlay
        const wireMat = new THREE.MeshBasicMaterial({ color: 0x915EFF, wireframe: true, transparent: true, opacity: 0.3 });
        const wire = new THREE.Mesh(geo, wireMat);
        scene.add(wire);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const pLight = new THREE.PointLight(0x915EFF, 3, 10);
        pLight.position.set(3, 3, 3);
        scene.add(pLight);
        const pLight2 = new THREE.PointLight(0x00FFFF, 2, 10);
        pLight2.position.set(-3, -2, -3);
        scene.add(pLight2);

        let isHovered = false;
        canvas.addEventListener('mouseenter', () => { isHovered = true; });
        canvas.addEventListener('mouseleave', () => { isHovered = false; });

        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const speed = isHovered ? 0.025 : 0.008;
            cube.rotation.x += speed;
            cube.rotation.y += speed * 1.3;
            wire.rotation.x = cube.rotation.x;
            wire.rotation.y = cube.rotation.y;
            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '360px', display: 'block' }}
        />
    );
};

export default Cube;
