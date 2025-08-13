"use client";

import { useEffect, useState } from 'react'
import ShortenerForm from './components/shortener-form'
import { useLink } from '@/store/link-store';

export type Link = {
    id: string,
    url: string,
    createdAt: string
};

export default function Home() {
    const { links } = useLink()

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center">
            <div className="w-full max-w-md">
                <div className="flex flex-col">
                    <h1 className="mb-6 text-center text-2xl font-normal">
                        Encurte URLS de forma rápida e fácil
                    </h1>
                    <ShortenerForm />
                </div>
            </div>
        </div>
    )
}