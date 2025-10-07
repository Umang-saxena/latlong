import { NextResponse } from 'next/server'
import {supabase} from '@/lib/supabaseClient'
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('state_level_vaccination')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data, { status: 200 })
    } catch (err: any) {
        console.error('Server error:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
