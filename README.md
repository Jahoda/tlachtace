# MiniBB - SvelteKit Clone

Moderní implementace miniBB (minimalistické bulletin board) postavená na SvelteKit a Supabase.

## Funkce

- Autentizace uživatelů (registrace, přihlášení, odhlášení)
- Více fór/kategorií
- Vytváření témat a příspěvků
- Editace a mazání vlastních příspěvků
- Uživatelské profily
- Responzivní moderní design s Tailwind CSS

## Technologie

- **SvelteKit 5** - Full-stack framework
- **Supabase** - Backend as a Service (databáze, autentizace)
- **TypeScript** - Typová bezpečnost
- **Tailwind CSS** - Styling

## Nastavení

### 1. Instalace závislostí

```bash
npm install
```

### 2. Nastavení Supabase

1. Vytvořte projekt na [supabase.com](https://supabase.com)
2. V Supabase SQL Editoru spusťte obsah souboru `supabase-schema.sql`
3. Zkopírujte `.env.example` do `.env`:
   ```bash
   cp .env.example .env
   ```
4. Vyplňte Supabase credentials v `.env`:
   - `PUBLIC_SUPABASE_URL` - najdete v Project Settings > API
   - `PUBLIC_SUPABASE_ANON_KEY` - najdete v Project Settings > API

### 3. Spuštění vývojového serveru

```bash
npm run dev
```

Aplikace běží na `http://localhost:5173`

## Build pro produkci

```bash
npm run build
npm run preview
```

## Struktura projektu

```
src/
├── lib/
│   └── supabase.ts          # Supabase client a typy
├── routes/
│   ├── +layout.svelte       # Hlavní layout s navigací
│   ├── +layout.server.ts    # Server-side session handling
│   ├── +page.svelte         # Homepage se seznamem fór
│   ├── auth/                # Autentizační stránky
│   ├── forum/[id]/          # Detail fóra s tématy
│   ├── thread/[id]/         # Detail tématu s příspěvky
│   └── profile/             # Uživatelský profil
├── app.css                  # Globální styly + Tailwind
└── app.html                 # HTML šablona
```

## Databázové schéma

- **profiles** - Uživatelské profily
- **forums** - Fóra/kategorie
- **threads** - Témata diskuzí
- **posts** - Jednotlivé příspěvky

Schéma obsahuje:
- Row Level Security (RLS) pro bezpečnost
- Automatické triggery pro vytváření profilů
- Indexy pro optimální výkon
