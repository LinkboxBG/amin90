# Деплой — Погребална агенция АМИН (amin90.com)

Сайтът е изграден на **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4** (CSS-first,
без `tailwind.config.js`). Шрифтове през `next/font` (Playfair Display + Montserrat, кирилица).

> Забележка: при разработката терминалът в средата не отговаряше, затова кодът е написан изцяло
> готов за билд, а командите по-долу трябва да се изпълнят локално/в CI. Интерактивните елементи
> (мобилно меню, FAQ акордеон) са реализирани на чист React (без shadcn/Radix), за да е билдът
> по-стабилен и без допълнителни зависимости.

## 0. (По избор) Преместване на агента към работната папка

Ако работите през Cursor агент, изпълнете първо:

```
move_agent_to_root → C:\Users\Ivan Kolev\Desktop\amin90
```

Работната папка вече е тази, така че при ръчна работа просто отворете директорията.

## 1. Изисквания

- Node.js >= 20.9
- npm (или pnpm/yarn/bun)

## 2. Инсталация

```bash
cd "C:\Users\Ivan Kolev\Desktop\amin90"
npm install
```

## 3. Локална разработка

```bash
npm run dev
# http://localhost:3000
```

## 4. Продукшън билд (локална проверка)

```bash
npm run build
npm run start
```

Поправете евентуални грешки, ако се появят (билдът не е изпълняван в средата на разработка).

## 5. Environment променливи

Копирайте `.env.example` като `.env.local` и попълнете:

| Променлива | Стойност (preview) | Стойност (production) |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://<проект>.vercel.app` | `https://amin90.com` |
| `NEXT_PUBLIC_ENV` | `staging` | `production` |

- `staging` → `robots` връща `noindex` (Disallow: /). 
- `production` → индексиране + `sitemap.xml`.

## 6. Деплой във Vercel (Фаза 1 — preview)

```bash
npm i -g vercel        # ако липсва
vercel login
vercel link            # свържи/създай проект
# задай env за Preview:
vercel env add NEXT_PUBLIC_SITE_URL preview
vercel env add NEXT_PUBLIC_ENV preview      # стойност: staging
vercel                 # preview deploy → връща *.vercel.app URL
```

Алтернативно: качете репото в GitHub и направете **Import Project** във Vercel дашборда
(framework се разпознава автоматично като Next.js). Добавете двете env променливи за Preview.

## 7. Фаза 2 — Production (след одобрение)

```bash
vercel env add NEXT_PUBLIC_SITE_URL production   # https://amin90.com
vercel env add NEXT_PUBLIC_ENV production         # production
vercel --prod
```

После:

1. Domains → добавете `amin90.com` и `www.amin90.com`.
   - **Primary домейн във Vercel:** `amin90.com` (без `www`). Ако primary е `www`, Vercel прави redirect apex→www и влиза в конфликт с `proxy.ts`/`vercel.json` (www→apex).
   - Nameservers при регистратора: `ns1.vercel-dns.com`, `ns2.vercel-dns.com` (проверка: `vercel domains inspect amin90.com`).
   - `www` → `amin90.com` чрез `proxy.ts` + `vercel.json`.
2. Production env във Vercel (задължително за индексиране):
   - `NEXT_PUBLIC_ENV=production`
   - `NEXT_PUBLIC_SITE_URL=https://amin90.com`
   - След промяна: **Redeploy** production.
3. Проверка след deploy:
   - `https://amin90.vercel.app/robots.txt` → `Allow: /` и `Sitemap: https://amin90.com/sitemap.xml`
   - Начална страница → `<meta name="robots" content="index, follow">`, canonical `https://amin90.com`
   - **Не** трябва да се вижда старият Apache сайт или sitemap от 2019.
4. Google Search Console → property `https://amin90.com`, sitemap `https://amin90.com/sitemap.xml`.
5. 301 redirects, ако новите URL се различават от стар сайт.

## 8. Какво има в сайта (v1)

10 страници: `/`, `/traurni-uslugi`, `/denonoshtna-pogrebalna-agenciya`, `/pogrebenie`,
`/kremaciya`, `/transport-na-pokoinik`, `/ketaring-pomen`, `/pametnitsi`, `/traurni-stoki`, `/ceni`.

- JSON-LD: `FuneralHome` (4 офиса subOrganization) на началната; `Service` + `FAQPage` по страниците.
- `sitemap.ts`, `robots.ts` (noindex на staging), `app/icon.svg` (favicon).
- Лого: единен `Logo` компонент (inline SVG) с варианти on-dark / on-light / mono-white / mono-navy / gradient / wordmark.

## 9. TODO — потвърди с клиента (не са измислени данни)

- [ ] **Точни адреси** на офисите (клиентът спомена, че точният адрес идва във Viber) — `content/site.json`.
- [ ] **Втори телефон** `0897 389 953` (от текстовете; основният `0878 907 150` е потвърден).
- [ ] **Снимки**: папка `client-files/images/` е празна. Когато пристигнат, сложи ги в
      `public/images/<slug>/` и ги включи (паметници = **мрамор**, не „гранит"; катафалки — без брой).
- [ ] **Паметници**: мапинг конкретна снимка ↔ цена/размер; цени за 3D форма (клиентът ще изпрати).
- [ ] **Снимки на офисите** (Стамболийски, Цалапица) + Google Maps embed в секцията „Нашите офиси".
- [ ] (По избор) копиране на суровите лога от `brand/logo-variations/*.svg` в `public/logo/`,
      ако е нужен достъп до файловете директно (UI ползва inline `Logo`).

## 10. Бранд правила, спазени в кода

- Само бранд цветове: navy `#141e3c`, gold `#baad7b`, бяло `#ffffff` (+ функционални оттенъци).
- Заглавия Playfair Display italic 900; текст Montserrat 16px/1.6; `::selection` злато.
- Без публикуван брой катафалки; без думата „гаранция" (мека формулировка при паметници).
- Тон формално „Вие"; pill CTA злато→navy; `.ds` тъмни секции; `.accent-rule` златна черта.
