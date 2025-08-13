import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex items-center justify-center h-18 w-full fixed bg-background">
            <div className="w-full max-w-4xl flex justify-between items-center">
                <h1 className="text-xl text-muted-foreground">Encurtador de URL</h1>
                <div className="flex gap-3">
                    <Link href="/sign-in">
                        <Button className={cn("rounded-xs")} variant="outline">
                            Entrar
                        </Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button className={cn("rounded-xs")}>
                            Cadastrar
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
 
export default Header;