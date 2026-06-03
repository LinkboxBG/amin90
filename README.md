# Погребална агенция АМИН — уебсайт (amin90.com)

Денонощна траурна агенция в гр. Стамболийски. Сайт на **Next.js 16 (App Router) + TypeScript +
Tailwind CSS v4** (CSS-first, без `tailwind.config.js`), `next/font` с кирилица.

## Бърз старт

```bash
npm install
npm run dev      # http://localhost:3000
```

За билд и деплой вижте **[DEPLOY.md](./DEPLOY.md)**.

## Структура

```
app/                 # маршрути (10 страници), layout, sitemap.ts, robots.ts, icon.svg
components/
  brand/Logo.tsx     # лого като inline SVG (варианти)
  layout/            # Header, Footer
  sections/          # Hero, TrustStrip, Steps, FAQ, CTABand, ServiceCards, PriceTable, ...
  ui/                # Container, CallButton, Icons
content/
  site.json          # контакти, 4 офиса, управител, соц. линкове
  navigation.ts      # меню (Услуги подменю + Цени)
  pricing.ts         # типизиран ценоразпис (EUR, 7 групи)
  pages/*.ts         # съдържание по страници (парснато от client-files)
lib/
  content.ts, seo.ts, site.ts
brand/               # източник: DESIGN_SYSTEM.md + logo-variations (не се сервират директно)
client-files/        # клиентски текстове и (бъдещи) снимки
```

## Дизайн система

Източник на истина: [`brand/DESIGN_SYSTEM.md`](./brand/DESIGN_SYSTEM.md) (v2.0).
Цветове: navy `#141e3c`, gold `#baad7b`, бяло `#ffffff`. Заглавия Playfair Display italic 900;
текст Montserrat 16px/1.6.

Отворени точки за потвърждение с клиента са описани в [DEPLOY.md](./DEPLOY.md) (раздел 9).
