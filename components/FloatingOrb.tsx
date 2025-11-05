'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FloatingOrb() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Create wireframe orb
    const geometry = new THREE.IcosahedronGeometry(2, 1)
    const material = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const orb = new THREE.Mesh(geometry, material)
    scene.add(orb)

    // Add animated lines
    const lineGeometry = new THREE.BufferGeometry()
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.5,
    })

    const lines: THREE.Line[] = []
    for (let i = 0; i < 10; i++) {
      const points: THREE.Vector3[] = []
      for (let j = 0; j < 20; j++) {
        const angle = (j / 20) * Math.PI * 2
        const radius = 2.5 + Math.sin(angle * 3 + i) * 0.3
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle * 3 + i) * 0.5,
            Math.sin(angle) * radius
          )
        )
      }
      lineGeometry.setFromPoints(points)
      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
      lines.push(line)
    }

    camera.position.z = 8
    camera.position.y = 1

    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01

      orb.rotation.x += 0.002
      orb.rotation.y += 0.003

      lines.forEach((line, i) => {
        line.rotation.y += 0.001 * (i % 2 === 0 ? 1 : -1)
        line.rotation.x += 0.0005
      })

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!mountRef.current) return
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}

