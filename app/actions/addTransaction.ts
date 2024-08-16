'use server'

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

interface TransactionRequest {
    text: string,
    amount: number
}

interface TransactionResponse {
    data?: TransactionRequest,
    error?: string
}

async function addTransaction(formData: FormData): Promise<TransactionResponse> {
    const textValue = formData.get('text');
    const amountValue = formData.get('amount');

    if (!textValue || textValue === '' || !amountValue) {
        return {error: 'Text or Amount is missing'}
    }

    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString());
    const { userId } = auth();

    if (!userId) {
        return {error: 'User not found!'}
    }

    try {
        const transactionData: TransactionRequest = await db.transaction.create({
            data: {
                text,
                amount,
                userId,
            }
        })

        revalidatePath('/');

        return {data: transactionData}

    } catch (error) {
        return { error: 'Trasaction not added'}
    }

}

export default addTransaction;
