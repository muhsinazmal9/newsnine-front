'use client'

import { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export default function SubscribeForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

    const submit = async (e) => {
        e.preventDefault()
        if (!email.trim()) return
        setStatus('loading')
        try {
            const res = await fetch(`${API_BASE}/subscribers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ email }),
            })
            setStatus(res.ok ? 'success' : 'error')
        } catch {
            setStatus('error')
        }
    }

    if (status === 'success') {
        return <p className="text-green-400 text-sm mt-2">সাবস্ক্রাইব করার জন্য ধন্যবাদ!</p>
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
                    disabled={status === 'loading'}
                    className="px-3 py-1.5 text-sm bg-teal-700 hover:bg-teal-600 text-white rounded transition disabled:opacity-50 cursor-pointer"
                >
                    {status === 'loading' ? '...' : 'সাবস্ক্রাইব'}
                </button>
            </form>
            {status === 'error' && <p className="text-red-400 text-xs mt-1">ত্রুটি হয়েছে, আবার চেষ্টা করুন।</p>}
        </div>
    )
}
