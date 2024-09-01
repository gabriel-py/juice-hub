import MenuHeader from './(components)/MenuHeader';
import styles from './styles.module.scss';

type RootLayoutProps = { children: React.ReactNode };

type AppProviderProps = {
    children: React.ReactNode;
  };

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <div>{children}</div>
    );
};

export function generateMetadata() {
    return {
      title: 'Juice Hub: A melhor loja de sucos online',
      description: 'Juice Hub: Compre sucos online com facilidade e rapidez. Com poucos cliques você seleciona sucos maravilhosos. As opções são diversas.',
      viewport: 'width=device-width, initial-scale=1.0',
      openGraph: {
        title: 'Juice Hub',
        description: 'Juice Hub: Compre sucos online com facilidade e rapidez. Com poucos cliques você seleciona sucos maravilhosos. As opções são diversas.',
      },
    };
  }

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR">
      <header>
        <title>Juice Hub: A melhor loja de sucos online</title>
        <meta property="og:description" content="Juice Hub: Compre sucos online com facilidade e rapidez." />
      </header>
      <body className={styles.screen}>
        <AppProvider>
          <MenuHeader />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
