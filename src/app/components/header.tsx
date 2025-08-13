import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="bg-background fixed flex h-18 w-full items-center justify-center">
            <div className="flex w-full max-w-4xl items-center justify-between">
                <h1 className="text-muted-foreground text-xl">
                    Encurtador de URL
                </h1>
                <div className="flex gap-3">
                    <Link href="/sign-in">
                        <Button className={cn('rounded-xs')} variant="outline">
                            Entrar
                        </Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button className={cn('rounded-xs')}>Cadastrar</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
