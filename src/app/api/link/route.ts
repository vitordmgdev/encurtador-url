import { PrismaClientKnownRequestError } from '@/generated/prisma/runtime/library'
import { createId } from '@/helpers/createId'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { url, userId } = await req.json()

    const id = createId()

    try {
        const link = await prisma.link.create({
            data: {
                id,
                url,
                user: userId && {
                    connect: {
                        id: userId,
                    },
                },
            },
        })

        return NextResponse.json(link, { status: 200 })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json(
                    { error: 'Link já existe' },
                    { status: 400 }
                )
            }
        }
    }
}

export async function GET(req: Request) {
    return NextResponse.json({ message: 'teste' }, { status: 200 })
}
