'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export default function SubscribeForm() {
    const [email, setEmail] = useState('')

    const mutation = useMutation({
        mutationFn: async (emailValue) => {
            const res = await fetch(`${API_BASE}/subscribers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ email: emailValue }),
            })
            if (!res.ok) throw new Error('Subscribe failed')
            return res.json()
        },
    })

    if (mutation.isSuccess) {
        return <p className="text-green-400 text-sm mt-2">সাবস্ক্রাইব করার জন্য ধন্যবাদ!</p>
    }

    const submit = (e) => {
        e.preventDefault()
        if (!email.trim()) return
        mutation.mutate(email)
    }

    return (
        <div>
            <form onSubmit={submit} className="flex gap-2 mt-2">
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="আপনার ইমেইল"
                    required
                    className="flex-1 px-3 py-1.5 text-sm bg-teal-900 border border-teal-700 text-white placeholder-teal-400 rounded focus:outline-none focus:border-teal-500"
                />
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="px-3 py-1.5 text-sm bg-teal-700 hover:bg-teal-600 text-white rounded transition disabled:opacity-50 cursor-pointer"
                >
                    {mutation.isPending ? '...' : 'সাবস্ক্রাইব'}
                </button>
            </form>
            {mutation.isError && <p className="text-red-400 text-xs mt-1">ত্রুটি হয়েছে, আবার চেষ্টা করুন।</p>}
        </div>
    )
}
