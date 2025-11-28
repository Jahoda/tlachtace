import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from './supabase';
import type { Cookies } from '@sveltejs/kit';

export function createSupabaseServerClient(cookies: Cookies) {
	return createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		auth: {
			flowType: 'pkce',
			autoRefreshToken: true,
			detectSessionInUrl: true,
			persistSession: true,
			storage: {
				getItem: (key) => {
					return cookies.get(key);
				},
				setItem: (key, value) => {
					cookies.set(key, value, {
						path: '/',
						httpOnly: true,
						sameSite: 'lax',
						secure: process.env.NODE_ENV === 'production',
						maxAge: 60 * 60 * 24 * 365 // 1 rok
					});
				},
				removeItem: (key) => {
					cookies.delete(key, { path: '/' });
				}
			}
		}
	});
}
