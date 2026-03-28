import React, { useEffect, useMemo, useRef, useState } from "react"

import { Button } from "@/components/UI/button/button"
import { Text } from "@/components/UI/Text/text"
import { useToast } from "@/hooks/useToast"

import styles from "./ImageUpload.module.scss"

type ImageUploadProps = {
  value?: string | null
  onChange: (value: string | null) => void
  label?: string
  helperText?: string
  size?: number
  maxSizeBytes?: number
  shape?: "circle" | "rect"
  showPreview?: boolean
  allowCrop?: boolean
  allowZoom?: boolean
  capture?: boolean
}

type Position = { x: number; y: number }

const DEFAULT_SIZE = 220
const MAX_SIZE = 2 * 1024 * 1024
const MAX_DIMENSION = 8192

const dataUrlSizeBytes = (dataUrl: string) => {
  const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl
  const padding = (base64.match(/=+$/) ?? [""])[0].length
  return (base64.length * 3) / 4 - padding
}

const ALLOWED_SIGNATURES: Record<string, number[]> = {
  "image/jpeg": [0xff, 0xd8, 0xff],
  "image/png": [0x89, 0x50, 0x4e, 0x47],
  "image/webp": [0x52, 0x49, 0x46, 0x46]
}

async function validateImageType(file: File): Promise<boolean> {
  const buffer = await file.slice(0, 4).arrayBuffer()
  const bytes = new Uint8Array(buffer)

  return Object.values(ALLOWED_SIGNATURES).some(sig => sig.every((byte, i) => bytes[i] === byte))
}

export function ImageUpload({
  value = null,
  onChange,
  label,
  helperText,
  size = DEFAULT_SIZE,
  maxSizeBytes = MAX_SIZE,
  shape = "circle",
  showPreview = false,
  allowCrop = true,
  allowZoom = true,
  capture = false
}: ImageUploadProps) {
  const toast = useToast()
  const [workingImage, setWorkingImage] = useState<string | null>(value)
  const [baseScale, setBaseScale] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const lastPoint = useRef<Position>({ x: 0, y: 0 })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    setWorkingImage(value)
  }, [value])

  const viewportSize = useMemo(() => size, [size])

  const bounds = useMemo(() => {
    if (!imgRef.current) return { maxX: 0, maxY: 0, displayWidth: 0, displayHeight: 0 }
    const displayWidth = imgRef.current.naturalWidth * baseScale * zoom
    const displayHeight = imgRef.current.naturalHeight * baseScale * zoom
    const maxX = Math.max(0, (displayWidth - viewportSize) / 2)
    const maxY = Math.max(0, (displayHeight - viewportSize) / 2)
    return { maxX, maxY, displayWidth, displayHeight }
  }, [baseScale, viewportSize, zoom])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const isValidImage = await validateImageType(file)
    if (!isValidImage) {
      toast.error("פורמט תמונה לא נתמך")
      event.target.value = ""
      return
    }

    if (file.size > maxSizeBytes) {
      toast.error("התמונה חייבת להיות עד 2MB")
      event.target.value = ""
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result?.toString() ?? null
      setWorkingImage(result)
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    }
    reader.readAsDataURL(file)
  }

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget
    const viewport = viewportRef.current
    if (!viewport) return

    if (img.naturalWidth > MAX_DIMENSION || img.naturalHeight > MAX_DIMENSION) {
      toast.error("ממדי התמונה גדולים מדי (מקסימום 8192px)")
      setWorkingImage(null)
      if (inputRef.current) inputRef.current.value = ""
      return
    }

    const scale = Math.max(viewport.clientWidth / img.naturalWidth, viewport.clientHeight / img.naturalHeight)
    setBaseScale(scale)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const clampPosition = (next: Position) => {
    const { maxX, maxY } = bounds
    return {
      x: Math.min(Math.max(next.x, -maxX), maxX),
      y: Math.min(Math.max(next.y, -maxY), maxY)
    }
  }

  const handlePointerDown = (event: React.PointerEvent) => {
    if (!workingImage || !allowCrop) return
    setDragging(true)
    lastPoint.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!dragging || !allowCrop) return
    event.preventDefault()
    const deltaX = event.clientX - lastPoint.current.x
    const deltaY = event.clientY - lastPoint.current.y
    lastPoint.current = { x: event.clientX, y: event.clientY }
    setPosition(prev => clampPosition({ x: prev.x + deltaX, y: prev.y + deltaY }))
  }

  const handlePointerUp = () => setDragging(false)

  const cropImage = async () => {
    if (!imgRef.current || !viewportRef.current || !workingImage) return null

    if (!allowCrop) {
      return workingImage
    }

    const outputSize = 400
    const canvas = document.createElement("canvas")
    canvas.width = outputSize
    canvas.height = outputSize
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    const { displayWidth, displayHeight } = bounds
    const left = viewportSize / 2 - displayWidth / 2 + position.x
    const top = viewportSize / 2 - displayHeight / 2 + position.y
    const scaleFactor = outputSize / viewportSize

    if (shape === "circle") {
      ctx.beginPath()
      ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
    }

    ctx.drawImage(imgRef.current, left * scaleFactor, top * scaleFactor, displayWidth * scaleFactor, displayHeight * scaleFactor)

    const formats: Array<{ type: string; quality?: number }> = [
      { type: "image/webp", quality: 0.85 },
      { type: "image/webp", quality: 0.75 },
      { type: "image/jpeg", quality: 0.85 },
      { type: "image/jpeg", quality: 0.75 }
    ]

    for (const { type, quality } of formats) {
      const result = canvas.toDataURL(type, quality)
      if (dataUrlSizeBytes(result) <= maxSizeBytes) return result
    }

    return canvas.toDataURL("image/webp", 0.6)
  }

  const handleSave = async () => {
    const cropped = await cropImage()
    if (!cropped) return
    const sizeBytes = dataUrlSizeBytes(cropped)
    if (sizeBytes > maxSizeBytes) {
      toast.error("התמונה החתוכה גדולה מדי")
      return
    }
    onChange(cropped)
    // Clear working image after save to allow next upload
    setWorkingImage(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const handleRemove = () => {
    setWorkingImage(null)
    setPosition({ x: 0, y: 0 })
    setZoom(1)
    onChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const handleWheel = (event: React.WheelEvent) => {
    if (!workingImage || !allowZoom) return
    event.preventDefault()
    const delta = event.deltaY > 0 ? -0.05 : 0.05
    setZoom(prev => Math.min(Math.max(prev + delta, 1), 3))
  }

  return (
    <div className={styles.wrapper}>
      {label && (
        <Text variant="span" className={styles.label}>
          {label}
        </Text>
      )}

      <div
        className={styles.viewport}
        data-shape={shape}
        data-has-image={!!workingImage}
        style={{ width: viewportSize, height: viewportSize }}
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}>
        {showPreview && (
          <>
            {workingImage ? (
              <img
                ref={imgRef}
                src={workingImage}
                alt="Profile preview"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                className={styles.image}
                style={{
                  width: allowCrop ? "auto" : "100%",
                  height: allowCrop ? "auto" : "100%",
                  objectFit: allowCrop ? "unset" : "contain",
                  top: allowCrop ? "50%" : "0",
                  left: allowCrop ? "50%" : "0",
                  transform: allowCrop
                    ? `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${baseScale * zoom})`
                    : "none"
                }}
                onLoad={handleImageLoad}
                draggable={false}
              />
            ) : (
              <div className={styles.placeholder}>
                <Text variant="span">לא נבחרה תמונה</Text>
              </div>
            )}
            {allowCrop && <div className={shape === "circle" ? styles.mask : styles.maskRect} />}
          </>
        )}
      </div>

      {!showPreview && workingImage && (
        <div className={styles.indicator}>
          <Text variant="span" className={styles.successText}>
            ✓ תמונה הועלתה
          </Text>
        </div>
      )}

      <div className={styles.controls}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture={capture ? "environment" : undefined}
          className={styles.input}
          onChange={handleFileChange}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          העלאה
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleRemove} disabled={!workingImage}>
          הסרה
        </Button>
        {showPreview && allowZoom && workingImage && (
          <div className={styles.slider}>
            <Text variant="span" className={styles.sliderLabel}>
              זום
            </Text>
            <input type="range" min={1} max={3} step={0.05} value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} />
          </div>
        )}
        <Button type="button" size="sm" onClick={handleSave} disabled={!workingImage}>
          שמירה
        </Button>
      </div>

      {helperText && (
        <Text variant="caption" className={styles.helper}>
          {helperText}
        </Text>
      )}
    </div>
  )
}
