import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export type Database = {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string;
					username: string;
					avatar_url: string | null;
					created_at: string;
				};
				Insert: {
					id: string;
					username: string;
					avatar_url?: string | null;
					created_at?: string;
				};
				Update: {
					id?: string;
					username?: string;
					avatar_url?: string | null;
					created_at?: string;
				};
			};
			forums: {
				Row: {
					id: number;
					name: string;
					description: string;
					created_at: string;
				};
				Insert: {
					id?: number;
					name: string;
					description: string;
					created_at?: string;
				};
				Update: {
					id?: number;
					name?: string;
					description?: string;
					created_at?: string;
				};
			};
			threads: {
				Row: {
					id: number;
					forum_id: number;
					title: string;
					author_id: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: number;
					forum_id: number;
					title: string;
					author_id: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: number;
					forum_id?: number;
					title?: string;
					author_id?: string;
					created_at?: string;
					updated_at?: string;
				};
			};
			posts: {
				Row: {
					id: number;
					thread_id: number;
					author_id: string;
					content: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: number;
					thread_id: number;
					author_id: string;
					content: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: number;
					thread_id?: number;
					author_id?: string;
					content?: string;
					created_at?: string;
					updated_at?: string;
				};
			};
		};
	};
};
