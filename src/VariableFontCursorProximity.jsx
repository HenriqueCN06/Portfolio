import * as React from "react"
import { useEffect, useRef } from "react"
const useIsStaticRenderer = () => false
import { motion, useAnimationFrame } from "framer-motion"

const INTER_VARIABLE_FONT_FACE = `
@font-face {
    font-family: "InterVariableFramer";
    src: url("https://rsms.me/inter/font-files/InterVariable.woff2?v=4.0") format("woff2-variations");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: "InterVariableFramer";
    src: url("https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.0") format("woff2-variations");
    font-weight: 100 900;
    font-style: italic;
    font-display: swap;
}
`

const VARIABLE_FONT_STACK =
    '"InterVariableFramer", "Inter Variable", "Inter", system-ui, sans-serif'

const MAX_REACH = 800

const WEIGHT_OPTIONS = [100, 200, 300, 400, 500, 600, 700, 800, 900]
const WEIGHT_TITLES = [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
]

const COMPONENT_DEFAULTS = {
    label: "Variable Font Proximity",
    fontSize: 48,
    color: "#FFFFFF",
    fromWeight: 400,
    toWeight: 900,
    strength: 25,
    transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut",
    },
}

const __originkitPresetProps = {
  "fontSize": 69,
  "fromWeight": 100,
  "strength": 51,
  "transition": {
    "ease": [0, 0, 0.58, 1],
    "mass": 1,
    "type": "tween",
    "damping": 60,
    "duration": 0.3,
    "stiffness": 800,
    "delay": 0
  }
};

function __OriginkitBase_VariableFontCursorProximity(props) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const {
        label,
        fromWeight,
        toWeight,
        strength,
        fontSize,
        color,
        transition,
        style,
        className
    } = props

    const reach = Math.max(
        1,
        (Math.max(1, Math.min(100, strength)) / 100) * MAX_REACH
    )

    const isStatic = useIsStaticRenderer()

    const containerRef = useRef(null)

    const letterRefs = useRef([])

    const letterFactorsRef = useRef([])

    const lastFrameRef = useRef(0)

    const mousePositionRef = useRef({ x: -99999, y: -99999 })

    useEffect(() => {
        if (isStatic) return

        const updatePosition = (clientX, clientY) => {
            const el = containerRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            mousePositionRef.current = {
                x: clientX - rect.left,
                y: clientY - rect.top,
            }
        }

        const handleMouseMove = (ev) =>
            updatePosition(ev.clientX, ev.clientY)
        const handleTouchMove = (ev) => {
            if (ev.touches.length === 0) return
            updatePosition(ev.touches[0].clientX, ev.touches[0].clientY)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("touchmove", handleTouchMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("touchmove", handleTouchMove)
        }
    }, [isStatic])

    const fromSettings = `'wght' ${fromWeight}`

    useAnimationFrame((now) => {
        if (isStatic) return
        const container = containerRef.current
        if (!container) return
        const containerRect = container.getBoundingClientRect()
        const mx = mousePositionRef.current.x
        const my = mousePositionRef.current.y

        const prevT = lastFrameRef.current || now
        const dtSec = Math.min(0.1, Math.max(0, (now - prevT) / 1000))
        lastFrameRef.current = now

        const tau = Math.max(0.016, transition?.duration ?? 0.3)
        const a = 1 - Math.exp(-dtSec / tau)

        for (let i = 0; i < letterRefs.current.length; i++) {
            const letterEl = letterRefs.current[i]
            if (!letterEl) continue
            const rect = letterEl.getBoundingClientRect()
            const cx = rect.left + rect.width / 2 - containerRect.left
            const cy = rect.top + rect.height / 2 - containerRect.top
            const dx = mx - cx
            const dy = my - cy
            const dist = Math.sqrt(dx * dx + dy * dy)

            const target = Math.min(Math.max(1 - dist / reach, 0), 1)
            const prev = letterFactorsRef.current[i] ?? 0
            const f = prev + (target - prev) * a
            letterFactorsRef.current[i] = f

            if (f < 0.001) {
                if (letterEl.style.fontVariationSettings !== fromSettings) {
                    letterEl.style.fontVariationSettings = fromSettings
                }
                continue
            }

            const w = Math.round(Number(fromWeight) + (Number(toWeight) - Number(fromWeight)) * f)
            letterEl.style.fontVariationSettings = `'wght' ${w}`
        }
    })

    const srOnlyStyle = {
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
    }

    const innerSpanStyle = {
        fontFamily: VARIABLE_FONT_STACK,
        fontSize: fontSize === 69 || fontSize === 48 ? 'inherit' : fontSize,
        color: color === "#FFFFFF" ? 'inherit' : color,
        textAlign: "center",
        display: "block",
        width: "100%",
        lineHeight: 1.1,
    }

    const words = label ? label.split(" ") : []

    // letterRefs.current = [] // removed to prevent missing refs on re-render
    let letterIndex = 0

    return (
        <span
            ref={containerRef}
            className={className}
            style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                ...style,
            }}
        >
            <style>{INTER_VARIABLE_FONT_FACE}</style>
            {words.length === 0 ? null : (
                <span style={innerSpanStyle}>
                    <span style={srOnlyStyle}>{label}</span>
                    {words.map((word, wi) => {
                        const wordLetters = word.split("")
                        return (
                            <React.Fragment key={wi}>
                                <span
                                    aria-hidden
                                    style={{
                                        display: "inline-block",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {wordLetters.map((letter, li) => {
                                        const idx = letterIndex++
                                        return (
                                            <motion.span
                                                key={li}
                                                ref={(el) => {
                                                    if (el) letterRefs.current[idx] = el
                                                }}
                                                style={{
                                                    display: "inline-block",
                                                    fontVariationSettings:
                                                        fromSettings,
                                                }}
                                            >
                                                {letter}
                                            </motion.span>
                                        )
                                    })}
                                </span>
                                {wi < words.length - 1 && (
                                    <span
                                        aria-hidden
                                        style={{
                                            display: "inline-block",
                                        }}
                                    >
                                        &nbsp;
                                    </span>
                                )}
                            </React.Fragment>
                        )
                    })}
                </span>
            )}
        </span>
    )
}

export default function VariableFontCursorProximity(props) {
  return <__OriginkitBase_VariableFontCursorProximity {...__originkitPresetProps} {...props} />;
}
