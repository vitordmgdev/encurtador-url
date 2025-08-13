"use server"

import { prisma } from "@/lib/prisma";
import { notFound, redirect } from 'next/navigation';

type LinkProps = {
    params: { id: string }
}

const LinkPage = async ({ params }: LinkProps) => {
    const { id } = params;

    const link = await prisma.link.findUnique({ where: { id } })

    if(link) {
        return redirect(link.url);
    }

    return notFound();
}
 
export default LinkPage;