import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Earth — A 3D Earth-like sphere with atmosphere glow effect.
 * Used in the Contact section as a decorative element.
 */
const Earth = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const W = canvas.clientWidth || 380;
        const H = canvas.clientHeight || 380;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
        camera.position.z = 3.5;

        // ── Earth sphere ─────────────────────────────────────────────────────────
        const earthGeo = new THREE.SphereGeometry(1.2, 64, 64);
        const earthMat = new THREE.MeshStandardMaterial({
            color: 0x1a4fa0,
            roughness: 0.7,
            metalness: 0.1,
        });
        const earth = new THREE.Mesh(earthGeo, earthMat);
        scene.add(earth);

        // Continent-like patches using additive blending
        const continentGeo = new THREE.SphereGeometry(1.21, 32, 32);
        const continentMat = new THREE.MeshStandardMaterial({
            color: 0x2d7d46,
            roughness: 0.9,
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        scene.add(new THREE.Mesh(continentGeo, continentMat));

        // ── Atmosphere glow ───────────────────────────────────────────────────────
        const atmGeo = new THREE.SphereGeometry(1.35, 32, 32);
        const atmMat = new THREE.MeshStandardMaterial({
            color: 0x3a7cf9,
            transparent: true,
            opacity: 0.12,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.BackSide,
        });
        scene.add(new THREE.Mesh(atmGeo, atmMat));

        // Second, larger atmosphere for the outer glow
        const atmGeo2 = new THREE.SphereGeometry(1.5, 32, 32);
        const atmMat2 = new THREE.MeshStandardMaterial({
            color: 0x00FFFF,
            transparent: true,
            opacity: 0.04,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.BackSide,
        });
        scene.add(new THREE.Mesh(atmGeo2, atmMat2));

        // ── Grid overlay (lat/lon lines) ──────────────────────────────────────────
        const gridGeo = new THREE.SphereGeometry(1.22, 24, 24);
        const gridMat = new THREE.MeshBasicMaterial({
            color: 0x915EFF,
            wireframe: true,
            transparent: true,
            opacity: 0.1,
        });
        scene.add(new THREE.Mesh(gridGeo, gridMat));

        // ── Lights ────────────────────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const sun = new THREE.DirectionalLight(0xffffff, 1.5);
        sun.position.set(5, 3, 5);
        scene.add(sun);
        const pLight = new THREE.PointLight(0x3a7cf9, 2, 10);
        pLight.position.set(-3, 2, -3);
        scene.add(pLight);

        // ── Animation ─────────────────────────────────────────────────────────────
        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            earth.rotation.y += 0.003;
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
            style={{ width: '100%', height: '380px', display: 'block' }}
        />
    );
};

export default Earth;
