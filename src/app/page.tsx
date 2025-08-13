'use client'

import ShortenerForm from './components/shortener-form'

export default function Home() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-12">
            <div className="flex w-full max-w-md flex-col">
                <h1 className="mb-6 text-center text-2xl font-normal">
                    Encurte URLs de forma rápida e fácil
                </h1>
                <ShortenerForm />
            </div>
        </div>
    )
}
