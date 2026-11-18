
"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus } from 'lucide-react'
import { UpdateCartProductQuantity } from '@/api/cartActions/UpdateCartProductQuantity.action'

export default function ProductQuantity({ count, id }: { count: number, id: string }) {
    const [quantity, setQuantity] = useState(count)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function updateQuantity(id: string, count: number) {
        try {
            setLoading(true)
            const response = await UpdateCartProductQuantity(id, count)
            router.refresh()
            return true
        } catch (error) {
            console.error(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    async function decrementQuantity() {
        if (quantity > 1 && !loading) {
            const newQuantity = quantity - 1
            if (await updateQuantity(id, newQuantity)) {
                setQuantity(newQuantity)
            }
        }
    }

    async function IncreaseQuantity() {
        if (!loading) {
            const newQuantity = quantity + 1
            if (await updateQuantity(id, newQuantity)) {
                setQuantity(newQuantity)
            }
        }
    }

    return (
        <div className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1">
            <button
                onClick={decrementQuantity}
                type="button"
                aria-label="Decrease quantity"
                disabled={loading || quantity <= 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 disabled:opacity-30"
            >
                <Minus size={14} />
            </button>

            <span className="min-w-5 text-center text-sm font-bold tabular-nums text-gray-900">
                {quantity}
            </span>

            <button
                onClick={IncreaseQuantity}
                type="button"
                aria-label="Increase quantity"
                disabled={loading}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 disabled:opacity-30"
            >
                <Plus size={14} />
            </button>
        </div>
    )
}
