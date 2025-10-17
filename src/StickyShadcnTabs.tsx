'use client'

import { ComponentProps, ReactNode, useEffect, useRef, useState, CSSProperties } from 'react'
import { AnimatePresence, motion, MotionProps } from 'framer-motion'
import { Tabs, TabsList } from './BaseTabs'

export type StickyShadcnTabsProps = ComponentProps<typeof Tabs> & {
	triggers: ReactNode[]
	children: ReactNode
	offset?: number
	enableBlur?: boolean
	enableShadow?: boolean
	enableFade?: boolean
	motionConfig?: MotionProps['transition']
	motionVariants?: {
		container?: any
		overlay?: any
		fade?: any
	}
	listClassName?: string
	containerClassName?: string
	overlayClassName?: string
	fadeClassName?: string
	style?: CSSProperties
	blurAmount?: number
	gradientHeight?: number
	gradientColors?: string
}

export function StickyShadcnTabs({
	triggers,
	children,
	className,
	offset = 0,
	enableBlur = true,
	enableShadow = true,
	enableFade = true,
	blurAmount = 12,
	gradientHeight = 8,
	gradientColors = 'from-background/80 to-transparent',
	motionConfig = { duration: 0.3, ease: 'easeOut' },
	motionVariants,
	listClassName,
	containerClassName,
	overlayClassName,
	fadeClassName,
	style,
	...props
}: StickyShadcnTabsProps) {
	const [isSticky, setIsSticky] = useState(false)
	const sentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const sentinel = sentinelRef.current
		if (!sentinel) return
		const observer = new IntersectionObserver(
			([entry]) => setIsSticky(!entry.isIntersecting),
			{ threshold: 0 }
		)
		observer.observe(sentinel)
		return () => observer.disconnect()
	}, [])

	const containerVariants = motionVariants?.container || {
		initial: { opacity: 0, y: -10, scale: 0.98, backdropFilter: enableBlur ? `blur(0px)` : undefined },
		animate: { opacity: 1, y: 0, scale: 1, backdropFilter: enableBlur ? `blur(${blurAmount}px)` : undefined, transition: motionConfig },
		exit: { opacity: 0, y: -10, scale: 0.98, backdropFilter: enableBlur ? `blur(0px)` : undefined }
	}

	const overlayVariants = motionVariants?.overlay || {
		initial: { opacity: 0 },
		animate: { opacity: 1, transition: motionConfig },
		exit: { opacity: 0, transition: motionConfig }
	}

	const fadeVariants = motionVariants?.fade || {
		initial: { opacity: 0 },
		animate: { opacity: 1, transition: motionConfig },
		exit: { opacity: 0, transition: motionConfig }
	}

	return (
		<Tabs className={className} {...props}>
			<div ref={sentinelRef} aria-hidden='true' />

			<AnimatePresence initial={false}>
				{isSticky && (
					<motion.div
						variants={containerVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						style={{ top: 0, ...style }}
						className={`fixed left-0 right-0 z-50 border-b ${enableShadow ? 'shadow-md' : ''} ${enableBlur ? 'bg-background/70 supports-[backdrop-filter]:bg-background/40' : 'bg-background'} ${containerClassName || ''}`}
					>
						{offset > 0 && (
							<motion.div
								variants={overlayVariants}
								initial='initial'
								animate='animate'
								exit='exit'
								style={{ height: offset }}
								className={`w-full ${overlayClassName || ''} ${enableBlur ? 'bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40' : ''}`}
							/>
						)}

						<TabsList className={listClassName}>{triggers}</TabsList>

						{enableFade && (
							<motion.div
								variants={fadeVariants}
								initial='initial'
								animate='animate'
								exit='exit'
								style={{ top: offset + 44, height: gradientHeight }}
								className={`absolute left-0 right-0 pointer-events-none h-${gradientHeight} bg-gradient-to-b ${gradientColors} ${fadeClassName || ''}`}
							/>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			{!isSticky && <TabsList className={listClassName}>{triggers}</TabsList>}
			{children}
		</Tabs>
	)
}
