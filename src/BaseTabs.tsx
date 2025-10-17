'use client'

import { ComponentProps } from 'react'
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs'
import { cn } from './lib/utils'

function Tabs({ className, ...props }: ComponentProps<typeof Root>) {
	return (
		<Root
			data-slot='tabs'
			className={cn('flex flex-col gap-2', className)}
			{...props}
		/>
	)
}

function TabsList({
	className,
	disableClassNames = false,
	...props
}: ComponentProps<typeof List> & { disableClassNames?: boolean }) {
	return (
		<List
			data-slot='tabs-list'
			className={cn(
				!disableClassNames &&
					'bg-muted text-muted-foreground inline-flex h-9 w-full items-center justify-center rounded-full p-1',
				className
			)}
			{...props}
		/>
	)
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof Trigger>) {
	return (
		<Trigger
			data-slot='tabs-trigger'
			className={cn(
				"data-[state=active]:text-primary focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:shadow-xs [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

function TabsContent({ className, ...props }: ComponentProps<typeof Content>) {
	return (
		<Content
			data-slot='tabs-content'
			className={cn('flex-1 space-y-3 outline-none', className)}
			{...props}
		/>
	)
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
