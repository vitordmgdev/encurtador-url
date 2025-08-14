"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useState, useTransition } from 'react'
import { Loader2Icon } from 'lucide-react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { FaXTwitter } from 'react-icons/fa6'
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'
import { useLink } from '@/store/link-store'

type Link = {
    id: string
    url: string
    createdAt: string
}

const ShortenerForm = () => {
    const [isPending, startTransition] = useTransition()

    const [copied, setCopied] = useState<boolean>(false)

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    const [link, setLink] = useState<Link>()

    const { addLink } = useLink()

    const ShortenerSchema = z.object({
        url: z.url({
            error: 'URL inválido',
        }),
    })

    const form = useForm({
        resolver: zodResolver(ShortenerSchema),
        defaultValues: {
            url: '',
        },
    })

    async function handleSubmit(values: z.infer<typeof ShortenerSchema>) {
        startTransition(async () => {
            const res = await fetch('/api/link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })

            const data = await res.json()

            if (res.ok) {
                setLink(data)

                addLink(data)

                form.reset()

                setDialogOpen(true)
            }
        })
    }

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(
                `http://localhost:3000/${link?.id}`
            )

            setCopied(true)

            setTimeout(() => setCopied(false), 1500)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    function handleClose() {
        setDialogOpen(false)
    }

    return (
        <AlertDialog open={dialogOpen}>
            <Form {...form}>
                <form
                    className="w-full"
                    onSubmit={form.handleSubmit(handleSubmit)}
                    method="POST"
                >
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex gap-2">
                                    <FormControl>
                                        <Input
                                            placeholder="https://exemplo.com.br"
                                            className={cn('rounded-l-full')}
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className={cn('rounded-r-full')}
                                            type="submit"
                                        >
                                            {isPending ? (
                                                <Loader2Icon className="animate-spin" />
                                            ) : (
                                                'Encurtar'
                                            )}
                                        </Button>
                                    </AlertDialogTrigger>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        URL encurtado com sucesso!
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <Separator orientation="horizontal" />
                <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground text-sm">
                        Link encurtado
                    </p>
                    <div className="bg-card flex items-center justify-between rounded-sm border p-1">
                        <p className="ml-3">{`${process.env.PROTOCOL}://${process.env.HOST}/${link?.id}`}</p>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                        'text-muted-foreground rounded-sm'
                                    )}
                                    onClick={handleCopy}
                                    aria-label={
                                        copied ? 'Copied' : 'Copy to clipboard'
                                    }
                                    disabled={copied}
                                >
                                    <div
                                        className={cn(
                                            'transition-all',
                                            copied
                                                ? 'scale-100 opacity-100'
                                                : 'scale-0 opacity-0'
                                        )}
                                    >
                                        <CheckIcon
                                            className="stroke-emerald-500"
                                            size={12}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div
                                        className={cn(
                                            'absolute transition-all',
                                            copied
                                                ? 'scale-0 opacity-0'
                                                : 'scale-100 opacity-100'
                                        )}
                                    >
                                        <CopyIcon
                                            size={12}
                                            aria-hidden="true"
                                        />
                                    </div>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="px-2 py-1 text-xs">
                                Clique para copiar
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <AlertDialogFooter>
                    <div className="flex flex-1 items-center gap-2">
                        <span className="text-muted-foreground mr-2 text-xs">
                            Compartilhar:
                        </span>
                        <Link
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`http://localhost:3000/${link?.id}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Compartilhar no Twitter"
                        >
                            <Button
                                size="icon"
                                className={cn('rounded-sm')}
                                variant="outline"
                            >
                                <FaXTwitter />
                            </Button>
                        </Link>
                        <Link
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`http://localhost:3000/${link?.id}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Compartilhar no Facebook"
                        >
                            <Button
                                size="icon"
                                className={cn('rounded-sm')}
                                variant="outline"
                            >
                                <FaFacebook />
                            </Button>
                        </Link>
                        <Link
                            href={`https://wa.me/?text=${encodeURIComponent(`http://localhost:3000/${link?.id}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Compartilhar no Whatsapp"
                        >
                            <Button
                                size="icon"
                                className={cn('rounded-sm')}
                                variant="outline"
                            >
                                <FaWhatsapp />
                            </Button>
                        </Link>
                    </div>
                    <Button
                        variant="default"
                        className={cn('rounded-sm')}
                        onClick={handleClose}
                    >
                        Fechar
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ShortenerForm
