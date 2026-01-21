import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header2 from '@/components/layout/Header2';
import Footer from '@/components/layout/Footer';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen flex flex-col">
        <Header2 locale={locale} />
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
