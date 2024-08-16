'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

interface responseDate {
    balance?: number,
    error?: string,
}
async function getUserBalance(): Promise<responseDate> {
    const { userId } = auth();

    if (! userId) {
        return { error: 'User not found!'}
    }
    try {
        const transactions = await db.transaction.findMany({
            where: {
                userId
            }
        })

        const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)

        return { balance }
    } catch (error) {
        return { error: 'Something wrong!'}
    }
}

export default getUserBalance;
